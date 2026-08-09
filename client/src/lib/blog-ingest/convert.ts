import {
  htmlToBlocks,
  randomKey,
  type TypedObject,
} from "@portabletext/block-tools";
import { Schema } from "@sanity/schema";
import type { ArraySchemaType } from "sanity";
import { JSDOM } from "jsdom";

export interface IncomingPost {
  automation_post_id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content_markdown?: string;
  content_html?: string;
  tags?: string[];
  meta_description?: string;
  cover_image_url?: string | null;
  published_at?: string;
}

// Text-only mirror of postType's `content` field. The full postType can't be
// compiled standalone (its image member needs Studio builtins like
// sanity.imageHotspot), and incoming HTML images are skipped in v1 anyway.
const compiledSchema = Schema.compile({
  name: "blog-ingest",
  types: [
    {
      name: "ingestPost",
      type: "document",
      fields: [
        {
          name: "content",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H1", value: "h1" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                  { title: "Code", value: "code" },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
});

const contentType = compiledSchema
  .get("ingestPost")
  .fields.find(
    (field: { name: string }) => field.name === "content"
  )?.type as ArraySchemaType;

export function htmlToPortableText(html: string): TypedObject[] {
  return htmlToBlocks(html, contentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
  });
}

export function plainTextToBlocks(text: string): TypedObject[] {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: "block",
      _key: randomKey(12),
      style: "normal",
      markDefs: [],
      children: [
        { _type: "span", _key: randomKey(12), text: paragraph, marks: [] },
      ],
    }));
}

export function buildContent(post: IncomingPost): TypedObject[] {
  if (post.content_html) {
    try {
      return htmlToPortableText(post.content_html);
    } catch {
      // fall through to plain text
    }
  }
  return post.content_markdown ? plainTextToBlocks(post.content_markdown) : [];
}

export function deriveExcerpt(post: IncomingPost): string {
  if (post.excerpt) return post.excerpt;
  if (post.meta_description) return post.meta_description;
  const text = post.content_markdown ?? stripTags(post.content_html ?? "");
  return text.slice(0, 200).trim();
}

export function computeReadTime(post: IncomingPost): string {
  const text = post.content_markdown ?? stripTags(post.content_html ?? "");
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words === 0) return "5 min read";
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

export function sanitizeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
