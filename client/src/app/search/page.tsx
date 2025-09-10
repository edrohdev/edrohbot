"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Navbar from "../../components/Navbar";
import PostCard from "../../components/PostCard";
import { searchPosts, Post } from "../../sanity/lib/posts";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchPosts(term);
      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Background geometric accents */}
      <div className="geometric-accent"></div>
      <div className="geometric-accent"></div>

      <Navbar />

      <main className="flex justify-center">
        <div className="w-full px-4 md:w-5/6 md:px-0 lg:w-3/4 mx-auto pt-8 pb-16">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Search Results
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-4 max-w-2xl">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles, tutorials, research..."
                  className="flex-1 py-3 px-4 bg-gray-700 border border-gray-600 rounded-md text-gray-300 font-mono text-sm outline-none transition-all duration-300 ease-in-out focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-br from-yellow-500 to-yellow-300 text-gray-800 px-6 py-3 rounded-md font-semibold transition-all duration-300 hover:shadow-[0_5px_15px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Search Info */}
            {query && (
              <div className="text-gray-400 mb-6">
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    {results.length} result{results.length !== 1 ? "s" : ""} for
                    &quot;{query}&quot;
                  </>
                )}
              </div>
            )}
          </div>

          {/* Search Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-yellow-500 text-lg">Searching...</div>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                No results found for &quot;{query}&quot;
              </div>
              <div className="text-gray-500 text-sm">
                Try different keywords or browse our{" "}
                <a
                  href="/all-articles"
                  className="text-yellow-500 hover:underline"
                >
                  all articles
                </a>{" "}
                page.
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">
                Enter a search term to find articles, tutorials, and research.
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen text-white">
          <div className="geometric-accent"></div>
          <div className="geometric-accent"></div>
          <Navbar />
          <main className="flex justify-center">
            <div className="w-full px-4 md:w-5/6 md:px-0 lg:w-3/4 mx-auto pt-8 pb-16">
              <div className="text-center py-12">
                <div className="text-yellow-500 text-lg">Loading...</div>
              </div>
            </div>
          </main>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
