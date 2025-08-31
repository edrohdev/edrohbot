import postsData from "../../data/posts/posts.json";
import PostCard from "../../components/PostCard";

export default function AllPosts() {
  const allArticles = postsData.filter((post) => post.featuredStatus === 0);

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
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
