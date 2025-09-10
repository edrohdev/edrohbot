import React from "react";
import Link from "next/link";
import { getLatestPosts } from "../sanity/lib/posts";

export default async function LatestPosts() {
  const allLatestPosts = await getLatestPosts(8);

  // Get latest articles for sidebar (same logic as Featured component)
  const latestArticles = allLatestPosts.map((post) => {
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
      slug: post.slug.current,
    };
  });

  return (
    <aside className="h-fit sticky top-24">
      <h3 className="text-yellow-500 text-base font-bold pb-6 m-0 tracking-wider border-b border-gray-600 uppercase">
        LATEST
      </h3>
      <div className="p-0">
        {latestArticles.map((article, index) => (
          <Link key={index} href={`/posts/${article.slug}`}>
            <article className="py-3 border-b border-gray-600 flex gap-4 transition-all duration-300 cursor-pointer hover:pl-2 hover:border-l-4 hover:border-l-yellow-500">
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
          </Link>
        ))}
      </div>
    </aside>
  );
}
