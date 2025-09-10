import React from "react";
import Link from "next/link";
import { Post } from "../sanity/lib/posts";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug.current}`}>
      <article className="h-[450px] bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl overflow-hidden border border-gray-600 transition-all duration-300 relative cursor-pointer hover:-translate-y-2 hover:border-yellow-500 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-yellow-500 before:to-yellow-300 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 flex flex-col">
        <div className="h-[10rem] flex-shrink-0 bg-gradient-to-br from-gray-600 to-gray-500 relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/40 to-yellow-500/10">
            <span className="text-5xl opacity-90">{post.image}</span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-around">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-gradient-to-br from-yellow-500 to-yellow-300 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm font-normal">
              {new Date(post.datetime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white leading-tight mb-4 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-300 text-sm font-light leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          <div className="flex justify-between items-center pt-4 border-t border-gray-600 mt-auto">
            <span className="text-yellow-500 text-sm font-semibold uppercase tracking-wider">
              By {post.author}
            </span>
            <span className="text-gray-400 text-xs font-normal">
              {post.readTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
