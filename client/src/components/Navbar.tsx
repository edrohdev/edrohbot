"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClasses = (href: string) => {
    const isActive =
      pathname === href || (pathname === "/" && href === "/home");
    return `font-normal transition-all duration-300 ease-in-out py-2 border-b-2 ${
      isActive
        ? "text-yellow-400 border-yellow-400 no-underline"
        : "text-gray-300 no-underline border-transparent hover:text-yellow-500 hover:border-yellow-500"
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-600 transition-all duration-500 ease-in-out py-2`}
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      }}
    >
      <div className="header-bg"></div>
      <div className="w-3/4 mx-auto flex items-center gap-8">
        <div>
          <div className="text-3xl font-bold leading-none">Edroh Botics</div>
          <div
            className={`text-xs text-gray-400 transition-all duration-500 ease-in-out overflow-hidden`}
          >
            Your hub for robotics innovation & news
          </div>
        </div>

        <div className="flex-1 flex justify-center relative">
          <nav className="flex gap-8 list-none">
            <Link href="/home" className={getLinkClasses("/home")}>
              Home
            </Link>
            <Link href="/events" className={getLinkClasses("/events")}>
              Events
            </Link>
            <Link
              href="/all-articles"
              className={getLinkClasses("/all-articles")}
            >
              All Articles
            </Link>
            <Link href="/about" className={getLinkClasses("/about")}>
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className={`relative overflow-hidden transition-all duration-300 ease-in-out min-w-0 z-10 ${
              isSearchOpen ? "w-[250px]" : "w-0"
            }`}
          >
            <input
              type="text"
              placeholder="Search articles, tutorials, research..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-md text-gray-300 font-mono text-sm outline-none transition-all duration-300 ease-in-out focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] placeholder:text-gray-500"
            />
          </div>
          <button
            className="bg-transparent border-none text-gray-300 text-xl cursor-pointer p-2 rounded transition-all duration-300 ease-in-out flex items-center justify-center min-w-[40px] h-10 z-10 relative hover:bg-yellow-500/10 hover:text-yellow-500"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
            }}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
