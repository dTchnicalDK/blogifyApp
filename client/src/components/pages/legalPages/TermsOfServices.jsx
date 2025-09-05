import React, { useState } from "react";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const sections = [
    { id: "acceptance", title: "Acceptance of Terms", icon: "✅" },
    { id: "user-conduct", title: "User Conduct", icon: "👤" },
    { id: "content", title: "Content Policy", icon: "📝" },
    { id: "intellectual", title: "Intellectual Property", icon: "🔐" },
    { id: "termination", title: "Termination", icon: "⏹️" },
    { id: "liability", title: "Liability", icon: "⚖️" },
    { id: "changes", title: "Changes to Terms", icon: "🔄" },
    { id: "contact", title: "Contact", icon: "📧" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Terms of Service
              </h1>
              <p className="mt-2 opacity-90">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="mt-1 text-sm opacity-80">
                BlogVibe - Your platform for sharing ideas
              </p>
            </div>
            <div className="hidden md:block bg-white/20 p-3 rounded-lg">
              <span className="text-2xl">📝</span>
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
            {activeSection === "acceptance" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">✅</span>
                  Acceptance of Terms
                </h2>
                <p className="text-gray-600 mb-4">
                  By accessing or using BlogVibe ("the Service"), you agree to
                  be bound by these Terms of Service and all applicable laws and
                  regulations.
                </p>
                <p className="text-gray-600 mb-4">
                  If you do not agree with any of these terms, you are
                  prohibited from using or accessing this Service.
                </p>
                <p className="text-gray-600">
                  The materials contained in this Service are protected by
                  applicable copyright and trademark law.
                </p>
              </section>
            )}

            {activeSection === "user-conduct" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">👤</span>
                  User Conduct
                </h2>
                <p className="text-gray-600 mb-4">
                  As a user of BlogVibe, you agree to:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
                  <li>
                    Provide accurate and complete registration information
                  </li>
                  <li>Maintain the security of your password and account</li>
                  <li>
                    Be responsible for all activities that occur under your
                    account
                  </li>
                  <li>
                    Not engage in unlawful or prohibited activities on the
                    Service
                  </li>
                  <li>
                    Not impersonate any person or entity or falsely state your
                    affiliation
                  </li>
                  <li>Not interfere with or disrupt the Service or servers</li>
                </ul>
                <p className="text-gray-600">
                  Violation of these conduct guidelines may result in
                  termination of your account.
                </p>
              </section>
            )}

            {activeSection === "content" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">📝</span>
                  Content Policy
                </h2>
                <p className="text-gray-600 mb-4">
                  BlogVibe allows users to post, link, store, share and
                  otherwise make available certain information, text, graphics,
                  videos, or other material ("Content").
                </p>
                <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
                  You are responsible for the Content that you post, including
                  its legality, reliability, and appropriateness.
                </h3>
                <p className="text-gray-600 mb-4">
                  By posting Content, you represent and warrant that:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>You own the Content or have the right to use it</li>
                  <li>
                    The Content does not violate the privacy rights, publicity
                    rights, copyrights, contract rights or any other rights of
                    any person
                  </li>
                  <li>
                    The posting of your Content does not result in a breach of
                    contract between you and a third party
                  </li>
                  <li>
                    Your Content does not contain any viruses, adware, spyware,
                    worms or other malicious code
                  </li>
                </ul>
                <p className="text-gray-600 mt-4">
                  BlogVibe reserves the right to terminate the account of anyone
                  found to be infringing on copyright.
                </p>
              </section>
            )}

            {activeSection === "intellectual" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">🔐</span>
                  Intellectual Property
                </h2>
                <p className="text-gray-600 mb-4">
                  The Service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  BlogVibe and its licensors.
                </p>
                <p className="text-gray-600 mb-4">
                  The Service is protected by copyright, trademark, and other
                  laws of both the United States and foreign countries.
                </p>
                <p className="text-gray-600 mb-4">
                  Our trademarks and trade dress may not be used in connection
                  with any product or service without the prior written consent
                  of BlogVibe.
                </p>
                <p className="text-gray-600">
                  When you upload content, you retain all rights to your
                  content. However, by posting content, you grant BlogVibe a
                  worldwide, non-exclusive, royalty-free license to use,
                  reproduce, modify, and display your content.
                </p>
              </section>
            )}

            {activeSection === "termination" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">⏹️</span>
                  Termination
                </h2>
                <p className="text-gray-600 mb-4">
                  We may terminate or suspend your account immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
                <p className="text-gray-600 mb-4">
                  Upon termination, your right to use the Service will
                  immediately cease.
                </p>
                <p className="text-gray-600">
                  If you wish to terminate your account, you may simply
                  discontinue using the Service or delete your account through
                  your account settings.
                </p>
              </section>
            )}

            {activeSection === "liability" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">⚖️</span>
                  Limitation of Liability
                </h2>
                <p className="text-gray-600 mb-4">
                  In no event shall BlogVibe, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
                  <li>
                    Your access to or use of or inability to access or use the
                    Service
                  </li>
                  <li>
                    Any conduct or content of any third party on the Service
                  </li>
                  <li>Any content obtained from the Service</li>
                  <li>
                    Unauthorized access, use or alteration of your transmissions
                    or content
                  </li>
                </ul>
                <p className="text-gray-600">
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis
                  without any warranties of any kind.
                </p>
              </section>
            )}

            {activeSection === "changes" && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-3">🔄</span>
                  Changes to Terms
                </h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time.
                </p>
                <p className="text-gray-600 mb-4">
                  If a revision is material, we will provide at least 30 days'
                  notice prior to any new terms taking effect.
                </p>
                <p className="text-gray-600">
                  What constitutes a material change will be determined at our
                  sole discretion. By continuing to access or use our Service
                  after those revisions become effective, you agree to be bound
                  by the revised terms.
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
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>By email: legal@blogvibe.com</li>
                  <li>By visiting our contact page: blogvibe.com/contact</li>
                  <li>
                    By mail: BlogVibe Inc., 123 Blog Street, Content City, CC
                    12345
                  </li>
                </ul>
              </section>
            )}
          </div>
        </div>

        <footer className="bg-gray-100 p-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} BlogVibe Inc. All rights reserved.</p>
          <p className="mt-2 text-sm">
            These Terms of Service govern your use of BlogVibe blogging
            platform.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;
