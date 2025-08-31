import postsData from "../../data/posts/posts.json";
import PostCard from "../../components/PostCard";

export default function Featured() {
  const featuredArticle = postsData.find((post) => post.featuredStatus === 2);
  const subArticles = postsData.filter((post) => post.featuredStatus === 1);

  // Get latest articles sorted by datetime (most recent first)
  const latestArticles = postsData
    .sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    )
    .slice(0, 8)
    .map((post) => {
      const date = new Date(post.datetime);
      const now = new Date();
      const diffInHours = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60)
      );

      let timeString;
      if (diffInHours < 24) {
        timeString = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      } else {
        timeString = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }

      return {
        time: timeString,
        title: post.title,
        author: post.author.toUpperCase(),
      };
    });

  return (
    <section className="grid grid-cols-3 gap-6 mb-12">
      {/* LEFT FEATURED COLUMN */}
      <div className="col-span-2">
        {featuredArticle && (
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
        )}

        <div className="grid grid-cols-2 gap-6 mt-7">
          {subArticles.map((article, index) => (
            <PostCard key={index} post={article} />
          ))}
        </div>
      </div>

      {/* RIGHT LATEST COLUMN */}
      <aside className="h-fit sticky top-24">
        <h3 className="text-yellow-500 text-base font-bold pb-6 m-0 tracking-wider border-b border-gray-600 uppercase">
          LATEST
        </h3>
        <div className="p-0">
          {latestArticles.map((article, index) => (
            <article
              key={index}
              className="py-3 border-b border-gray-600 flex gap-4 transition-all duration-300 cursor-pointer hover:pl-2 hover:border-l-4 hover:border-l-yellow-500 last:border-b-0"
            >
              <div className="text-xs text-gray-400 font-medium min-w-15 text-right pt-1">
                {article.time}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-200 leading-relaxed mb-2">
                  {article.title}
                </h4>
                <div className="text-xs text-yellow-500 font-semibold uppercase tracking-wider">
                  {article.author}
                </div>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}
