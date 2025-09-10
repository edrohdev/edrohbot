import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "./Hero";
import Featured from "./Featured";
import AllPosts from "./AllPosts";

export default function HomeContent() {
  return (
    <>
      <div className="geometric-accent"></div>
      <div className="geometric-accent"></div>

      <Navbar />

      <main className="flex justify-center">
        <div className="w-full px-4 md:w-5/6 md:px-0 lg:w-3/4 mx-auto">
          <Hero />
          <Suspense
            fallback={
              <div className="min-h-[calc(55vh)] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-yellow-500 text-lg mb-2">
                    Loading content...
                  </div>
                  <div className="text-gray-400 text-sm">
                    Fetching featured articles and latest posts
                  </div>
                </div>
              </div>
            }
          >
            <Featured />
            <AllPosts />
          </Suspense>
        </div>
      </main>
    </>
  );
}
