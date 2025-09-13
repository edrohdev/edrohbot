import { client } from "./client";

export interface Post {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  datetime: string;
  author: string;
  readTime: string;
  image: string;
  mainImage?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
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
  };
  content: string;
  featuredStatus: number;
  slug: {
    current: string;
  };
}

// GROQ query to fetch all posts
const ALL_POSTS_QUERY = `*[_type == "post"] | order(datetime desc) {
  _id,
  title,
  excerpt,
  category,
  datetime,
  author,
  readTime,
  image,
  mainImage,
  content,
  featuredStatus,
  slug
}`;

// GROQ query to fetch a single post by slug
const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  excerpt,
  category,
  datetime,
  author,
  readTime,
  image,
  mainImage,
  content,
  featuredStatus,
  slug
}`;

// GROQ query to fetch posts by featured status
const POSTS_BY_FEATURED_STATUS_QUERY = `*[_type == "post" && featuredStatus == $status] | order(datetime desc) {
  _id,
  title,
  excerpt,
  category,
  datetime,
  author,
  readTime,
  image,
  mainImage,
  content,
  featuredStatus,
  slug
}`;

export async function getAllPosts(): Promise<Post[]> {
  return await client.fetch(ALL_POSTS_QUERY);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await client.fetch(POST_BY_SLUG_QUERY, { slug });
}

export async function getPostsByFeaturedStatus(
  status: number
): Promise<Post[]> {
  return await client.fetch(POSTS_BY_FEATURED_STATUS_QUERY, { status });
}

export async function getFeaturedPost(): Promise<Post | null> {
  const posts = await getPostsByFeaturedStatus(2);
  return posts[0] || null;
}

export async function getSubFeaturedPosts(): Promise<Post[]> {
  return await getPostsByFeaturedStatus(1);
}

export async function getRegularPosts(): Promise<Post[]> {
  return await getPostsByFeaturedStatus(0);
}

export async function getLatestPosts(limit: number = 8): Promise<Post[]> {
  const query = `*[_type == "post"] | order(datetime desc)[0...${limit}] {
    _id,
    title,
    excerpt,
    category,
    datetime,
    author,
    readTime,
    image,
    mainImage,
    content,
    featuredStatus,
    slug
  }`;
  return await client.fetch(query);
}

// GROQ query for full-text search across posts
const SEARCH_POSTS_QUERY = `*[_type == "post" && (
  title match $searchTerm + "*" ||
  excerpt match $searchTerm + "*" ||
  content match $searchTerm + "*" ||
  category match $searchTerm + "*" ||
  author match $searchTerm + "*"
)] | order(_score desc, datetime desc) {
  _id,
  title,
  excerpt,
  category,
  datetime,
  author,
  readTime,
  image,
  mainImage,
  content,
  featuredStatus,
  slug,
  _score
}`;

export async function searchPosts(searchTerm: string): Promise<Post[]> {
  if (!searchTerm.trim()) {
    return [];
  }

  // Clean and prepare search term
  const cleanSearchTerm = searchTerm.trim().toLowerCase();

  return await client.fetch(SEARCH_POSTS_QUERY, {
    searchTerm: cleanSearchTerm,
  });
}
