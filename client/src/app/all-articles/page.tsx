import { getAllPosts } from "../../sanity/lib/posts";
import Navbar from "../../components/Navbar";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const POSTS_PER_PAGE = 6;

export default async function AllArticlesPage({ searchParams }: PageProps) {
  const allPosts = await getAllPosts();
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // Calculate pagination
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen text-white">
      {/* Background geometric accents */}
      <div className="geometric-accent"></div>
      <div className="geometric-accent"></div>

      <Navbar />

      <main className="flex justify-center">
        <div className="w-full px-4 md:w-5/6 md:px-0 lg:w-3/4 mx-auto pt-8 pb-16">
          {/* Header section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
              All Articles
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-6">
              Explore our complete collection of robotics insights, research,
              and industry developments. From cutting-edge AI to breakthrough
              technologies shaping the future.
            </p>
            <div className="mt-6 text-sm text-yellow-500 font-medium">
              {allPosts.length} articles available • Page {currentPage} of{" "}
              {totalPages}
            </div>
          </div>

          {/* Articles list */}
          <div className="space-y-8">
            {currentPosts.map((post) => (
              <div key={post._id} className="mb-8">
                <Link href={`/posts/${post.slug.current}`}>
                  <article className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden border border-gray-600 transition-all duration-300 hover:border-yellow-500 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] hover:-translate-y-1 cursor-pointer">
                    <div className="grid grid-cols-12 gap-0 h-64">
                      {/* Left side - Image */}
                      <div className="col-span-3 bg-gradient-to-br from-yellow-500 to-yellow-300 relative overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/30 to-yellow-500/10">
                          <span className="text-5xl opacity-80">
                            {post.image}
                          </span>
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className="col-span-9 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="bg-gradient-to-br from-yellow-500 to-yellow-300 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                              {post.category}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {new Date(post.datetime).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>

                          <h2 className="text-2xl font-semibold text-white leading-tight mb-3 line-clamp-2">
                            {post.title}
                          </h2>

                          <p className="text-gray-300 text-sm font-light leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex justify-between items-center pt-3">
                          <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">
                            By {post.author}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                {/* Previous button */}
                {currentPage > 1 && (
                  <Link
                    href={`/all-articles?page=${currentPage - 1}`}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-yellow-500 hover:border-yellow-500 transition-all duration-200"
                  >
                    Previous
                  </Link>
                )}

                {/* Page numbers */}
                {getPageNumbers().map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/all-articles?page=${pageNum}`}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      pageNum === currentPage
                        ? "bg-gradient-to-br from-yellow-500 to-yellow-300 text-gray-800 border border-yellow-400"
                        : "text-gray-300 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-yellow-500 hover:border-yellow-500"
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}

                {/* Next button */}
                {currentPage < totalPages && (
                  <Link
                    href={`/all-articles?page=${currentPage + 1}`}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-yellow-500 hover:border-yellow-500 transition-all duration-200"
                  >
                    Next
                  </Link>
                )}
              </nav>
            </div>
          )}

          {/* Results info */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, allPosts.length)} of{" "}
            {allPosts.length} articles
          </div>
        </div>
      </main>
    </div>
  );
}
