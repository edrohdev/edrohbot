import { FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-6 border-t border-gray-600 text-center text-gray-400">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-6">
            <a
              href="https://www.edroh.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
              aria-label="Visit edroh.com"
            >
              <FaGlobe size={20} />
            </a>
            <a
              href="https://instagram.com/edroh.bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
              aria-label="Follow on Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/edwardroh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
              aria-label="Connect on LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Copyright Text */}
          <p className="text-sm">
            &copy; 2025 Edroh.Bot; Advancing the field of robotics through
            knowledge sharing.
          </p>
        </div>
      </div>
    </footer>
  );
}
