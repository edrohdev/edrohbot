import { getRegularPosts } from "../../sanity/lib/posts";
import PostCard from "../../components/PostCard";
import Link from "next/link";

export default async function AllPosts() {
  const allArticles = await getRegularPosts();

  return (
    <section className="pt-8 border-t border-gray-600">
      <div className="mb-8 my-5">
        <h2 className="text-2xl font-semibold text-yellow-500 text-center tracking-wider">
          ALL POSTS
        </h2>
        <p className="text-sm text-gray-300 mx-auto font-light text-center">
          Explore entire collection of robotics insights and research
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {allArticles.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-8">
        <Link
          href="/all-articles"
          className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-yellow-500 hover:border-yellow-500 transition-all duration-200"
        >
          View More
        </Link>
      </div>
    </section>
  );
}
