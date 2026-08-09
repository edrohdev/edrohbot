// Receive-post endpoint for the automation platform's blog webhook.
// Contract: POST with Authorization: Bearer <BLOG_INGEST_TOKEN>.
// - {action: "verify", challenge} → 200 {challenge}
// - {action: "publish", post}     → upsert into Sanity, 201/200 {id, url}
import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";

import { writeClient } from "../../../../sanity/lib/writeClient";
import {
  buildContent,
  computeReadTime,
  deriveExcerpt,
  sanitizeId,
  slugify,
  type IncomingPost,
} from "../../../../lib/blog-ingest/convert";

export const runtime = "nodejs";

const DEFAULT_AUTHOR = "Editorial Team";
const DEFAULT_CATEGORY = "AI & Machine Learning";
const DEFAULT_EMOJI = "🤖";

function isAuthorized(request: Request): boolean {
  const expected = process.env.BLOG_INGEST_TOKEN;
  if (!expected) return false;
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;
  const a = createHash("sha256").update(match[1]).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function siteUrl(): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return base.replace(/\/+$/, "");
}

async function savePost(
  post: IncomingPost
): Promise<{ id: string; url: string; created: boolean }> {
  const _id = `post-automation-${sanitizeId(post.automation_post_id)}`;
  const slug = slugify(post.slug || post.title);

  const existing = await writeClient.getDocument(_id);

  await writeClient.createOrReplace({
    _id,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: slug },
    excerpt: deriveExcerpt(post),
    category: post.tags?.[0] || DEFAULT_CATEGORY,
    datetime: post.published_at || new Date().toISOString(),
    author: DEFAULT_AUTHOR,
    readTime: computeReadTime(post),
    content: buildContent(post),
    automationPostId: post.automation_post_id,
    // Preserve Studio-curated presentation fields on republish.
    image: existing?.image ?? DEFAULT_EMOJI,
    featuredStatus: existing?.featuredStatus ?? 0,
    ...(existing?.mainImage ? { mainImage: existing.mainImage } : {}),
  });

  revalidatePath("/");
  revalidatePath("/home");
  revalidatePath("/all-articles");
  revalidatePath("/posts/[id]", "page");
  revalidatePath(`/posts/${slug}`);

  return { id: _id, url: `${siteUrl()}/posts/${slug}`, created: !existing };
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body.action === "verify" && typeof body.challenge === "string") {
    return NextResponse.json({ challenge: body.challenge });
  }

  if (body.action === "publish" && body.post && typeof body.post === "object") {
    const post = body.post as IncomingPost;
    if (
      typeof post.automation_post_id !== "string" ||
      !post.automation_post_id.trim() ||
      typeof post.title !== "string" ||
      !post.title.trim()
    ) {
      return NextResponse.json({ error: "invalid_post" }, { status: 400 });
    }
    try {
      const { id, url, created } = await savePost(post);
      return NextResponse.json({ id, url }, { status: created ? 201 : 200 });
    } catch (error) {
      console.error("blog webhook publish failed:", error);
      return NextResponse.json({ error: "publish_failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "unknown_action" }, { status: 400 });
}
