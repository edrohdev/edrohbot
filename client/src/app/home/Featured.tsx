import { getFeaturedPost, getSubFeaturedPosts } from "../../sanity/lib/posts";
import PostCard from "../../components/PostCard";
import LatestPosts from "../../components/LatestPosts";
import Link from "next/link";

export default async function Featured() {
  const featuredArticle = await getFeaturedPost();
  const subArticles = await getSubFeaturedPosts();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      {/* LEFT FEATURED COLUMN */}
      <div className="lg:col-span-2">
        {featuredArticle && (
          <Link href={`/posts/${featuredArticle.slug.current}`}>
            <article className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden border border-gray-600 transition-all duration-300 cursor-pointer hover:border-yellow-500 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]">
              <div className="h-72 bg-gradient-to-br from-yellow-500 to-yellow-300 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/30 to-yellow-500/10">
                  <div className="text-6xl opacity-80">
                    {featuredArticle.image}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-yellow-500 font-medium mb-4 uppercase tracking-wider">
                  {new Date(featuredArticle.datetime).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}{" "}
                  • {featuredArticle.category}
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-white leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-300 font-light mb-6 text-base">
                  {featuredArticle.excerpt}
                </p>
                <div className="text-gray-400 text-sm">
                  By <strong>{featuredArticle.author}</strong>
                </div>
              </div>
            </article>
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">
          {subArticles.map((article) => (
            <PostCard key={article._id} post={article} />
          ))}
        </div>
      </div>

      {/* RIGHT LATEST COLUMN */}
      <LatestPosts />
    </section>
  );
}
