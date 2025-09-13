import { getPostBySlug, getAllPosts } from "../../../sanity/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import LatestPosts from "../../../components/LatestPosts";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../../sanity/lib/image";
import SanityImage from "../../../components/SanityImage";

interface SanityImageValue {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  size?: "small" | "medium" | "large" | "full";
  alignment?: "left" | "center" | "right";
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

const components = {
  types: {
    image: ({ value }: { value: SanityImageValue }) => {
      if (!value?.asset) return null;

      // Determine dimensions based on size setting
      const sizeMap = {
        small: { width: 400, height: 300 },
        medium: { width: 600, height: 400 },
        large: { width: 800, height: 500 },
        full: { width: 1200, height: 600 },
      };

      const size = value.size || "large";
      const dimensions = sizeMap[size];

      // Determine alignment classes
      const alignmentClass =
        value.alignment === "left"
          ? "mr-auto"
          : value.alignment === "right"
            ? "ml-auto"
            : "mx-auto"; // center (default)

      const imageUrl = urlFor(value)
        ?.width(dimensions.width)
        .height(dimensions.height)
        .url();
      if (!imageUrl) return null;

      return (
        <figure className={`my-8 ${alignmentClass}`}>
          <SanityImage
            src={imageUrl}
            alt={value.alt || "Article image"}
            width={dimensions.width}
            height={dimensions.height}
            className={`rounded-lg ${size === "full" ? "w-full" : ""}`}
            sizes={
              size === "full"
                ? "100vw"
                : size === "large"
                  ? "(max-width: 768px) 100vw, 800px"
                  : size === "medium"
                    ? "(max-width: 768px) 100vw, 600px"
                    : "(max-width: 768px) 100vw, 400px"
            }
            priority={false}
            objectFit="contain"
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-400 mt-2 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href: string };
    }) => {
      const rel =
        value && !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
      return (
        <a href={value?.href || "#"} rel={rel}>
          {children}
        </a>
      );
    },
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-2xl font-bold">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl font-semibold">{children}</h2>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-yellow-500 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-5">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
  },
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostBySlug(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen text-white">
      {/* Background geometric accents */}
      <div className="geometric-accent"></div>
      <div className="geometric-accent"></div>

      <Navbar />

      <main className="flex justify-center">
        <div className="w-full px-4 md:w-5/6 md:px-0 lg:w-3/4 mx-auto pt-5 pb-16">
          {/* Back navigation */}
          <div className="mb-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-200 text-sm font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT ARTICLE COLUMN */}
            <div className="lg:col-span-2">
              {/* Header section with gradient background */}
              <header className="relative mb-8">
                {post.mainImage ? (
                  <div className="h-72 relative overflow-hidden rounded-xl">
                    <SanityImage
                      src={urlFor(post.mainImage)?.url() || ""}
                      alt={post.title}
                      fill
                      objectFit="cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-yellow-500/10"></div>
                  </div>
                ) : (
                  <div className="h-72 bg-gradient-to-br from-yellow-500 to-yellow-300 relative overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-yellow-500/10"></div>
                    <div className="relative h-full flex items-center justify-center">
                      <span className="text-6xl opacity-80">{post.image}</span>
                    </div>
                  </div>
                )}
              </header>

              {/* Article metadata */}
              <div className="mb-8">
                <div className="text-sm text-yellow-500 font-medium mb-4 uppercase tracking-wider">
                  {new Date(post.datetime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  • {post.category}
                </div>

                <h1 className="text-4xl font-bold mb-4 text-white leading-tight">
                  {post.title}
                </h1>

                <div className="text-gray-400 text-sm mb-6">
                  By <strong className="text-yellow-500">{post.author}</strong>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Article content */}
              <article className="text-gray-300 leading-relaxed space-y-6 text-lg">
                {typeof post.content === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <PortableText value={post.content} components={components} />
                )}
              </article>

              {/* Back to home button */}
              <div className="mt-12">
                <Link
                  href="/"
                  className="inline-flex items-center bg-gradient-to-br from-yellow-500 to-yellow-300 text-gray-800 px-6 py-3 rounded-xl font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:-translate-y-1"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  More Articles
                </Link>
              </div>
            </div>

            {/* RIGHT LATEST COLUMN */}
            <LatestPosts />
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    id: post.slug.current,
  }));
}
