const { createClient } = require("@sanity/client");
const postsData = require("../src/data/posts/posts.json");
require("dotenv").config({ path: ".env.local" });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9p3v4q5r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-08-31",
  useCdn: false, // For mutations, we need to use the non-CDN endpoint
  token: process.env.SANITY_API_TOKEN, // You'll need to create this token
});

async function migratePosts() {
  console.log("Starting migration of posts to Sanity...");

  try {
    // Transform posts data to match Sanity schema
    const transformedPosts = postsData.map((post) => ({
      _type: "post",
      _id: `post-${post.id}`, // Use a predictable ID format
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      datetime: post.datetime,
      author: post.author,
      readTime: post.readTime,
      image: post.image,
      content: post.content,
      featuredStatus: post.featuredStatus,
      slug: {
        _type: "slug",
        current: post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      },
    }));

    console.log(`Migrating ${transformedPosts.length} posts...`);

    // Create or replace posts in Sanity
    const transaction = client.transaction();

    transformedPosts.forEach((post) => {
      transaction.createOrReplace(post);
    });

    const result = await transaction.commit();

    console.log("Migration completed successfully!");
    console.log(
      `Migrated posts:`,
      result.results.map((r) => r.document?.title).filter(Boolean)
    );
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migratePosts();
