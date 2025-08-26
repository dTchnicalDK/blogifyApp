import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import { Link } from "react-router";

const Footer1 = () => {
  return (
    <div className="bg-slate-950 w-full  text-white relative">
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Information Column */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4">My Company</h3>
            <p className="text-gray-400 mb-4">
              Providing the best products and services since{" "}
              {new Date().getFullYear()}.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-white mb-4">Products</h4>
            <ul>
              <li className="mb-2">
                <Link
                  to="/features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/integrations"
                  className="hover:text-white transition-colors"
                >
                  Integrations
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/partners"
                  className="hover:text-white transition-colors"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul>
              <li className="mb-2">
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/security"
                  className="hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} My Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer1;
