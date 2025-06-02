import React from "react";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">EasyExplore</h2>
          <p className="text-sm">
            Empowering students with the right guidance for a brighter future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-gray-900 transition duration-300">Home</a></li>
            <li><a href="/jobs" className="hover:text-gray-900 transition duration-300">Jobs</a></li>
            <li><a href="/browse" className="hover:text-gray-900 transition duration-300">Browse</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition transform hover:scale-110 duration-300">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-500 transition transform hover:scale-110 duration-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-700 transition transform hover:scale-110 duration-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 transition transform hover:scale-110 duration-300">
              <Github size={24} />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EasyExplore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
