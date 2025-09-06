import { Strikethrough } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";

const StunningLandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "🎯",
      title: "Targeted Study Materials",
      description:
        "Precision-focused resources designed for specific academic challenges and learning objectives.",
    },
    {
      icon: "🧠",
      title: "Cognitive Strategies",
      description:
        "Evidence-based learning techniques that enhance retention, comprehension, and application.",
    },
    {
      icon: "📚",
      title: "Uncommon Resources",
      description:
        "Exclusive content you won't find elsewhere, curated by top educators and researchers.",
    },
    {
      icon: "⚡",
      title: "Efficient Learning",
      description:
        "Maximize your study time with methods that yield better results in less time.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Medical Student",
      content:
        "The study strategies completely transformed how I approach complex subjects. My grades improved by a full letter grade in just one semester!",
      avatar: "👩‍⚕️",
    },
    {
      name: "Michael T.",
      role: "Engineering Major",
      content:
        "The uncommon resources provided insights I couldn't find in any textbook. Finally understood concepts that had confused me for months.",
      avatar: "👨‍🔬",
    },
    {
      name: "Priya K.",
      role: "Law Student",
      content:
        "The targeted study materials helped me focus on exactly what I needed for my exams. Saved me countless hours of ineffective studying.",
      avatar: "👩‍⚖️",
    },
  ];

  const resources = [
    { name: "Study Guides", count: "250+", icon: "📖" },
    { name: "Strategy Videos", count: "120+", icon: "🎥" },
    { name: "Expert Articles", count: "500+", icon: "📝" },
    { name: "Interactive Tools", count: "30+", icon: "🛠️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">
                <span className="text-indigo-600">My</span>Blogs
              </div>
            </div>

            <div className="hidden md:flex space-x-8">
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `py-4 px-2 text-gray-600 font-semibold hover:text-blue-600 transition duration-300 nav-item ${
                    isActive ? "active" : ""
                  }`
                }
                end
              >
                Features
              </NavLink>
              <NavLink
                to="/coming-soon"
                className={({ isActive }) =>
                  `py-4 px-2 text-gray-600 font-semibold hover:text-blue-600 transition duration-300 nav-item ${
                    isActive ? "active" : ""
                  }`
                }
                end
              >
                <strike>Resources</strike>
              </NavLink>
              <NavLink
                to="/coming-soon"
                className={({ isActive }) =>
                  `py-4 px-2 text-gray-600 font-semibold hover:text-blue-600 transition duration-300 nav-item ${
                    isActive ? "active" : ""
                  }`
                }
                end
              >
                <strike>Testimonials</strike>
              </NavLink>
              <NavLink
                to="/coming-soon"
                className={({ isActive }) =>
                  `py-4 px-2 text-gray-600 font-semibold hover:text-blue-600 transition duration-300 nav-item ${
                    isActive ? "active" : ""
                  }`
                }
                end
              >
                <strike>Pricing</strike>
              </NavLink>
            </div>

            <div className="hidden md:flex space-x-4">
              <Link to={"/login"}>
                <button className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#resources"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Resources
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </a>
                <div className="pt-4 flex flex-col space-y-3">
                  <button className="px-4 py-2 text-blue-600 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Login
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Transform Your{" "}
                <span className="text-blue-600">Learning Journey</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover targeted study strategies, uncommon resources, and
                evidence-based learning techniques designed to help you excel
                academically.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/user">
                  <button className=" cursor-pointer px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:-translate-y-1 duration-300">
                    Start Learning Now
                  </button>
                </Link>
                <Link to="/user">
                  <button className="cursor-pointer px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-sm hover:bg-blue-50 transition-colors">
                    Explore Resources
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-3">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6">
                  <div className="flex justify-center mb-6">
                    <div className="text-5xl">📚</div>
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                    Academic Success Blueprint
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-500 text-xl mr-2">✓</span>
                      <span className="text-gray-700">
                        Personalized Study Plans
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 text-xl mr-2">✓</span>
                      <span className="text-gray-700">
                        Research-Backed Strategies
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 text-xl mr-2">✓</span>
                      <span className="text-gray-700">
                        Exclusive Learning Materials
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg transform rotate-12 z-10">
                Trusted by 10,000+ Students
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {resources.map((resource, index) => (
              <div key={index} className="p-4">
                <div className="text-4xl mb-3">{resource.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800">
                  {resource.count}
                </div>
                <div className="text-gray-600">{resource.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Students Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique approach to academic success combines cutting-edge
              research with practical application
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            How It Works
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="text-5xl">🔍</div>
                  </div>
                  <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    1. Identify Your Needs
                  </h3>
                  <p className="text-gray-600 text-center">
                    Tell us your academic challenges, subjects, and goals. Our
                    system analyzes your needs to create a personalized learning
                    path.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Receive Custom Resources
                    </h3>
                    <p className="text-gray-600">
                      Get access to targeted study materials and strategies
                      specifically curated for your needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 font-bold rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Implement Strategies
                    </h3>
                    <p className="text-gray-600">
                      Apply our evidence-based learning techniques with
                      step-by-step guidance and support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-600 font-bold rounded-full w-12 h-12 flex items-center justify-center mr-6 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Achieve Academic Excellence
                    </h3>
                    <p className="text-gray-600">
                      Track your progress, improve your grades, and develop
                      lifelong learning skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Students Say
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="text-4xl mb-6">"</div>
              <p className="text-xl md:text-2xl italic mb-8">
                {testimonials[activeTestimonial].content}
              </p>
              <div className="flex items-center">
                <div className="text-3xl mr-4">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold text-lg">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div>{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index
                      ? "bg-white"
                      : "bg-white bg-opacity-30"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Join thousands of students who have achieved academic excellence
            with our targeted strategies and resources.
          </p>
          <Link to="/login">
            <button className="cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors transform hover:-translate-y-1 duration-300">
              Get Started Today
            </button>
          </Link>
          <p className="mt-6 text-gray-500">
            No credit card required. Free trial available.
          </p>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                Academic Insight Hub
              </div>
              <p>
                Transforming how students learn, study, and excel academically.
              </p>
            </div>

            <div>
              <div className="text-white font-semibold mb-4">Resources</div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Study Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Learning Strategies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog Articles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Research Papers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-semibold mb-4">Company</div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-semibold mb-4">Connect</div>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-2xl hover:text-white transition-colors"
                >
                  📘
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-white transition-colors"
                >
                  🐦
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-white transition-colors"
                >
                  📸
                </a>
                <a
                  href="#"
                  className="text-2xl hover:text-white transition-colors"
                >
                  👨‍💼
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>
              © {new Date().getFullYear()} Academic Insight Hub. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default StunningLandingPage;
