"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "./Hero";
import Featured from "./Featured";
import AllPosts from "./AllPosts";
import Footer from "./Footer";

export default function HomeContent() {
  useEffect(() => {
    // intersection observer for animations
    const cards = document.querySelectorAll(
      ".featured-article, .sub-article, .latest-item"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = "0";
      (card as HTMLElement).style.transform = "translateY(20px)";
      (card as HTMLElement).style.transition =
        "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="geometric-accent"></div>
      <div className="geometric-accent"></div>

      <Navbar />

      <main className="flex justify-center">
        <div className="w-3/4 mx-auto">
          <Hero />
          <Featured />
          <AllPosts />
        </div>
      </main>

      <Footer />
    </>
  );
}
