import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const sections = [
    { id: "introduction", title: "Introduction", icon: "📄" },
    { id: "data-collection", title: "Data Collection", icon: "🔍" },
    { id: "data-usage", title: "Data Usage", icon: "📊" },
    { id: "cookies", title: "Cookies", icon: "🍪" },
    { id: "rights", title: "Your Rights", icon: "🛡️" },
    { id: "contact", title: "Contact Us", icon: "📧" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
              <p className="mt-2 opacity-90">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="hidden md:block bg-white/20 p-3 rounded-lg">
              <span className="text-2xl">🔒</span>
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row">
          {/* Navigation - Mobile */}
          <div className="md:hidden bg-gray-100 p-4">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
            >
              <span className="font-medium">Jump to Section</span>
              <span>{isNavOpen ? "▲" : "▼"}</span>
            </button>

            {isNavOpen && (
              <div className="mt-3 bg-white rounded-lg shadow-sm p-2">
                <ul>
                  {sections.map((section) => (
                    <li key={section.id} className="mb-1 last:mb-0">
                      <button
                        className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-colors ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setActiveSection(section.id);
                          setIsNavOpen(false);
                        }}
                      >
                        <span className="mr-3 w-5 text-center">
                          {section.icon}
                        </span>
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:block w-full md:w-64 bg-gray-50 p-6 border-r border-gray-200">
            <h2 className="font-bold text-gray-700 mb-4 text-lg">Contents</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="mr-3 w-5 text-center">{section.icon}</span>
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 p-6 md:p-8">
            {activeSection === "introduction" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">📄</span>
                  Introduction
                </h2>
                <p className="text-gray-600 mb-4">
                  Welcome to our Privacy Policy. Your privacy is critically
                  important to us.
                </p>
                <p className="text-gray-600 mb-4">
                  This privacy policy applies to information we collect when you
                  use our website and services.
                </p>
                <p className="text-gray-600">
                  We respect your privacy and are committed to protecting
                  personally identifiable information you may provide us.
                </p>
              </section>
            )}

            {activeSection === "data-collection" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">🔍</span>
                  Data Collection
                </h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as
                  when you create an account, subscribe to our newsletter, or
                  contact us for support.
                </p>
                <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
                  Information we collect may include:
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>
                    Name and contact information (email address, phone number)
                  </li>
                  <li>Account credentials (username and password)</li>
                  <li>Demographic information (age, gender, location)</li>
                  <li>Payment information for purchases</li>
                  <li>Content you generate or upload on our platform</li>
                </ul>
              </section>
            )}

            {activeSection === "data-usage" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">📊</span>
                  How We Use Your Data
                </h2>
                <p className="text-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>
                    Send you technical notices, updates, and support messages
                  </li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>
                    Personalize and improve your experience with our services
                  </li>
                </ul>
              </section>
            )}

            {activeSection === "cookies" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">🍪</span>
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to track
                  activity on our service and hold certain information.
                </p>
                <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
                  Types of cookies we use:
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>
                    <strong>Essential cookies:</strong> Required for operation
                    of our service
                  </li>
                  <li>
                    <strong>Analytical/performance cookies:</strong> Allow us to
                    recognize and count visitors
                  </li>
                  <li>
                    <strong>Functionality cookies:</strong> Enable us to
                    personalize content
                  </li>
                  <li>
                    <strong>Targeting cookies:</strong> Record your visit and
                    pages you visit
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can instruct your browser to refuse all cookies or
                  indicate when a cookie is being sent.
                </p>
              </section>
            )}

            {activeSection === "rights" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">🛡️</span>
                  Your Privacy Rights
                </h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location, you may have the following rights
                  regarding your personal information:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>
                    The right to access and receive a copy of your personal
                    information
                  </li>
                  <li>
                    The right to rectify (correct) inaccurate personal
                    information
                  </li>
                  <li>
                    The right to request deletion of your personal information
                  </li>
                  <li>
                    The right to restrict or object to processing of your
                    information
                  </li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise any of these rights, please contact us using the
                  information in the "Contact Us" section.
                </p>
              </section>
            )}

            {activeSection === "contact" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">📧</span>
                  Contact Us
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>By email: privacy@yourcompany.com</li>
                  <li>
                    By mail: Your Company Name, 123 Privacy Street, Data City,
                    DC 12345
                  </li>
                  <li>Through our website: www.yourcompany.com/contact</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We will respond to all legitimate requests within 30 days.
                </p>
              </section>
            )}
          </div>
        </div>

        <footer className="bg-gray-100 p-6 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
