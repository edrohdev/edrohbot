import Navbar from "../../components/Navbar";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Background geometric accents */}
      <div className="geometric-accent"></div>
      <div className="geometric-accent"></div>

      <Navbar />

      <main className="flex justify-center">
        <div className="w-full px-4 md:w-5/6 md:px-0 lg:w-3/4 mx-auto pt-8 pb-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              {/* Avatar */}
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-500 to-yellow-300 rounded-full flex items-center justify-center text-6xl border-4 border-gray-600 shadow-lg">
                👨‍💻
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
              About Edward
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-7">
              Web Developer, Robotics Educator & Technology Enthusiast
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-yellow-500 mb-4 tracking-wider">
                  Hello, I&apos;m Edward!
                </h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Welcome to my corner of the internet! I&apos;m a passionate
                    web developer and robotics educator with over 8 years of
                    experience bridging the gap between cutting-edge technology
                    and accessible education. My journey began with a simple
                    fascination: how can we make complex robotics concepts
                    understandable and exciting for everyone?
                  </p>
                  <p>
                    As a full-stack developer, I specialize in creating
                    intuitive digital experiences using modern technologies like
                    React, Next.js, and Node.js. But my true passion lies in the
                    intersection of technology and education, particularly in
                    the field of robotics and automation.
                  </p>
                </div>
              </section>

              {/* Passion */}
              <section>
                <h2 className="text-2xl font-semibold text-yellow-500 mb-4 tracking-wider">
                  My Robotics Passion
                </h2>
                <div className="text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Robotics isn&apos;t just my profession – it&apos;s my
                    obsession. I believe we&apos;re living through one of the
                    most exciting periods in human history, where the boundaries
                    between science fiction and reality continue to blur. From
                    autonomous vehicles navigating our streets to surgical
                    robots saving lives, the field of robotics is reshaping our
                    world.
                  </p>
                  <p>
                    What excites me most is the democratization of robotics
                    technology. Today&apos;s students have access to tools and
                    platforms that were once reserved for research labs and
                    major corporations. Through this blog and my educational
                    work, I aim to share the latest developments, breakthrough
                    research, and practical applications that are shaping our
                    automated future.
                  </p>
                  <p>
                    Whether it&apos;s exploring the latest advances in neural
                    networks, diving deep into sensor fusion algorithms, or
                    simply marveling at a new robotic achievement, I&apos;m here
                    to share that journey with fellow enthusiasts, students, and
                    anyone curious about the incredible world of robotics.
                  </p>
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Skills */}
              <section className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 mb-8">
                <h3 className="text-lg font-semibold text-yellow-500 mb-4 uppercase tracking-wider">
                  Expertise
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500 text-lg">💻</span>
                    <span className="text-gray-300 text-sm">
                      Full-Stack Development
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500 text-lg">🤖</span>
                    <span className="text-gray-300 text-sm">
                      Robotics Education
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500 text-lg">🧠</span>
                    <span className="text-gray-300 text-sm">
                      AI & Machine Learning
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500 text-lg">📚</span>
                    <span className="text-gray-300 text-sm">
                      Curriculum Development
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500 text-lg">⚙️</span>
                    <span className="text-gray-300 text-sm">
                      Automation Systems
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500 text-lg">🎓</span>
                    <span className="text-gray-300 text-sm">
                      STEM Education
                    </span>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 mb-8">
                <h3 className="text-lg font-semibold text-yellow-500 mb-4 uppercase tracking-wider">
                  Connect
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://www.edroh.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition-colors group"
                  >
                    <FaGlobe className="text-lg group-hover:text-yellow-500 transition-colors" />
                    <span className="text-sm">edroh.com</span>
                  </a>
                  <a
                    href="https://instagram.com/edroh.bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition-colors group"
                  >
                    <FaInstagram className="text-lg group-hover:text-yellow-500 transition-colors" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/edwardroh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-yellow-500 transition-colors group"
                  >
                    <FaLinkedin className="text-lg group-hover:text-yellow-500 transition-colors" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </section>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-8 border border-gray-600">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Let&apos;s Explore Robotics Together
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Whether you&apos;re a student, educator, or fellow robotics
                enthusiast, I&apos;d love to connect and share in this
                incredible journey of discovery and innovation.
              </p>
              <Link
                href="/all-articles"
                className="inline-flex items-center bg-gradient-to-br from-yellow-500 to-yellow-300 text-gray-800 px-8 py-3 rounded-xl font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:-translate-y-1"
              >
                Explore My Articles
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
