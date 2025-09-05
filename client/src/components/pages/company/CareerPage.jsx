import React, { useState } from "react";

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState("open-positions");
  const [selectedJob, setSelectedJob] = useState(null);

  const openPositions = [
    {
      id: 1,
      title: "Content Writer",
      department: "Content",
      type: "Full-time",
      location: "Remote",
      description:
        "We're looking for talented writers to create engaging content for our blog.",
      requirements: [
        "3+ years of professional writing experience",
        "Excellent grammar and storytelling skills",
        "Ability to research and write about various topics",
        "SEO knowledge is a plus",
      ],
    },
    {
      id: 2,
      title: "SEO Specialist",
      department: "Marketing",
      type: "Full-time",
      location: "Remote",
      description:
        "Help optimize our content and improve our search engine rankings.",
      requirements: [
        "2+ years of SEO experience",
        "Knowledge of keyword research tools",
        "Experience with analytics platforms",
        "Technical SEO knowledge",
      ],
    },
    {
      id: 3,
      title: "Social Media Manager",
      department: "Marketing",
      type: "Part-time",
      location: "Remote",
      description:
        "Manage our social media presence and engage with our community.",
      requirements: [
        "Experience managing social media accounts",
        "Content creation skills",
        "Knowledge of social media analytics",
        "Creative thinking",
      ],
    },
    {
      id: 4,
      title: "Web Developer",
      department: "Engineering",
      type: "Contract",
      location: "Remote",
      description: "Help maintain and improve our blogging platform.",
      requirements: [
        "Experience with React/Next.js",
        "Knowledge of modern CSS frameworks",
        "Understanding of web performance",
        "Git experience",
      ],
    },
  ];

  const benefits = [
    {
      icon: "🏠",
      title: "Remote Work",
      description: "Work from anywhere in the world",
    },
    {
      icon: "💪",
      title: "Health Benefits",
      description: "Comprehensive health insurance",
    },
    {
      icon: "📈",
      title: "Career Growth",
      description: "Opportunities for learning and advancement",
    },
    {
      icon: "🕒",
      title: "Flexible Hours",
      description: "Set your own schedule",
    },
    {
      icon: "🌴",
      title: "Unlimited PTO",
      description: "Take time off when you need it",
    },
    {
      icon: "💻",
      title: "Tech Stipend",
      description: "Budget for your home office setup",
    },
  ];

  const culture = [
    {
      title: "Mission Driven",
      description: "We're passionate about helping people share their stories",
    },
    {
      title: "Inclusive",
      description: "We value diverse perspectives and backgrounds",
    },
    {
      title: "Transparent",
      description: "Open communication and honest feedback",
    },
    {
      title: "Innovative",
      description: "We encourage experimentation and new ideas",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Help us build the best platform for bloggers and content creators
          </p>
          <button
            onClick={() => {
              setActiveTab("open-positions");
              document
                .getElementById("open-positions")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300"
          >
            View Open Positions
          </button>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "open-positions"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("open-positions")}
          >
            Open Positions
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "benefits"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("benefits")}
          >
            Benefits
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "culture"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("culture")}
          >
            Our Culture
          </button>
        </div>

        {/* Open Positions */}
        {activeTab === "open-positions" && (
          <section id="open-positions" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Open Positions
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {openPositions.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedJob(job)}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                      {job.location}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Benefits */}
        {activeTab === "benefits" && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Benefits
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 text-center"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Culture */}
        {activeTab === "culture" && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Culture
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  What We Value
                </h3>
                <div className="space-y-4">
                  {culture.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-md p-5"
                    >
                      <h4 className="text-lg font-medium text-gray-800 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Life at BlogVibe
                </h3>
                <div className="bg-white rounded-xl shadow-md p-5 h-full">
                  <p className="text-gray-600 mb-4">
                    At BlogVibe, we believe that great content has the power to
                    change perspectives, inspire action, and connect people
                    across the globe.
                  </p>
                  <p className="text-gray-600 mb-4">
                    We're a fully remote team spread across multiple time zones,
                    but we stay connected through regular video calls, virtual
                    coffee chats, and our vibrant Slack community.
                  </p>
                  <p className="text-gray-600">
                    We value autonomy and trust our team members to do their
                    best work, whether that's early in the morning or late at
                    night.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Even if you don't see the perfect role listed, we're always
            interested in meeting passionate people who share our vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              View Open Positions
            </button>
            <button className="bg-transparent hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg border border-white transition-colors duration-300">
              General Application
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} BlogVibe. All rights reserved.</p>
          <p className="mt-2">Questions? Email us at careers@blogvibe.com</p>
        </div>
      </footer>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedJob.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                      {selectedJob.department}
                    </span>
                    <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                      {selectedJob.type}
                    </span>
                    <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                      {selectedJob.location}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Requirements
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
