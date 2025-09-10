"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href || (pathname === "/" && href === "/");
    return `font-normal transition-all duration-300 ease-in-out py-2 border-b-2 text-sm md:text-base ${
      isActive
        ? "text-yellow-400 border-yellow-400 no-underline"
        : "text-gray-300 no-underline border-transparent hover:text-yellow-500 hover:border-yellow-500"
    }`;
  };

  const getMobileLinkClasses = (href: string) => {
    const isActive = pathname === href || (pathname === "/" && href === "/");
    return `block w-full text-left px-4 py-4 text-base font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? "text-yellow-400 bg-yellow-500/15"
        : "text-gray-300 hover:text-yellow-500 hover:bg-yellow-500/10"
    }`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-600 transition-all duration-500 ease-in-out py-2`}
      style={{
        background: "linear-gradient(135deg, #292929 0%, #2d2d2d 100%)",
      }}
    >
      <div className="header-bg"></div>
      <div className="w-full px-4 md:w-5/6 md:px-0 lg:w-3/4 mx-auto flex items-center gap-3 md:gap-6 lg:gap-8">
        <Link href="/home" className="group cursor-pointer">
          <div className="text-3xl font-bold leading-none text-white transition-all ease-in-out duration-300 group-hover:text-yellow-400">
            Edroh.Bot
          </div>
          <div
            className={`text-xs text-gray-400 transition-all duration-300 ease-in-out overflow-hidden group-hover:text-yellow-400`}
          >
            <span className="md:hidden">Robotics Hub</span>
            <span className="hidden md:inline">
              Your hub for robotics innovation & news
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex-1 justify-center relative hidden sm:flex">
          <nav className="flex gap-3 md:gap-6 lg:gap-8 list-none">
            <Link href="/" className={getLinkClasses("/")}>
              Home
            </Link>
            <Link
              href="/all-articles"
              className={getLinkClasses("/all-articles")}
            >
              Articles
            </Link>
            <Link href="/events" className={getLinkClasses("/events")}>
              Events
            </Link>
            <Link href="/about" className={getLinkClasses("/about")}>
              About
            </Link>
          </nav>
        </div>

        {/* Mobile spacer */}
        <div className="flex-1 sm:hidden"></div>

        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          <div
            className={`relative overflow-hidden transition-all duration-300 ease-in-out min-w-0 z-10 ${
              isSearchOpen ? "w-[200px] md:w-[250px]" : "w-0"
            }`}
          >
            <form onSubmit={handleSearch} className="w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-md text-gray-300 font-mono text-sm outline-none transition-all duration-300 ease-in-out focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] placeholder:text-gray-500"
              />
            </form>
          </div>
          <button
            className="bg-transparent border-none text-gray-300 text-xl cursor-pointer p-1 md:p-2 rounded transition-all duration-300 ease-in-out flex items-center justify-center min-w-[32px] md:min-w-[40px] h-8 md:h-10 z-10 relative hover:bg-yellow-500/10 hover:text-yellow-500"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
            }}
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="bg-transparent border-none text-gray-300 cursor-pointer p-1 md:p-2 rounded transition-all duration-300 ease-in-out flex items-center justify-center min-w-[32px] h-8 z-10 relative hover:bg-yellow-500/10 hover:text-yellow-500 sm:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-gray-600 shadow-2xl w-full max-w-sm mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-600">
                <h3 className="text-lg font-semibold text-white">Navigation</h3>
                <button
                  className="bg-transparent border-none text-gray-300 cursor-pointer p-2 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center w-8 h-8 hover:bg-yellow-500/10 hover:text-yellow-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <nav className="p-6">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className={getMobileLinkClasses("/")}
                    onClick={handleMobileMenuClick}
                  >
                    🏠 Home
                  </Link>
                  <Link
                    href="/all-articles"
                    className={getMobileLinkClasses("/all-articles")}
                    onClick={handleMobileMenuClick}
                  >
                    📚 Articles
                  </Link>
                  <Link
                    href="/events"
                    className={getMobileLinkClasses("/events")}
                    onClick={handleMobileMenuClick}
                  >
                    📅 Events
                  </Link>
                  <Link
                    href="/about"
                    className={getMobileLinkClasses("/about")}
                    onClick={handleMobileMenuClick}
                  >
                    👨‍💻 About
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
