import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hello? I'd love to
            hear from you. Send me a message and I'll respond as soon as
            possible.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Information */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <span className="text-blue-600 text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">dtechnicaldk@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <span className="text-green-600 text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Social Media</h3>
                    <div className="flex space-x-4 mt-2">
                      <a
                        href="#"
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <span className="text-xl">📘</span>
                      </a>
                      <a
                        href="#"
                        className="text-blue-400 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-xl">🐦</span>
                      </a>
                      <a
                        href="#"
                        className="text-pink-500 hover:text-pink-700 transition-colors"
                      >
                        <span className="text-xl">📸</span>
                      </a>
                      <a
                        href="#"
                        className="text-blue-700 hover:text-blue-900 transition-colors"
                      >
                        <span className="text-xl">👨‍💼</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <span className="text-purple-600 text-xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Response Time</h3>
                    <p className="text-gray-600">
                      I typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-800 mb-4">
                  Frequently Asked
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    • Do you accept guest posts?
                  </p>
                  <p className="text-sm text-gray-600">
                    • Can I advertise on your blog?
                  </p>
                  <p className="text-sm text-gray-600">
                    • Do you offer writing collaborations?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send a Message
              </h2>

              {isSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <p className="font-medium">Thank you for your message!</p>
                  <p>I'll get back to you as soon as possible.</p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="collaboration">Collaboration Inquiry</option>
                    <option value="guest-post">Guest Post Proposal</option>
                    <option value="advertising">Advertising Opportunity</option>
                    <option value="feedback">Website Feedback</option>
                    <option value="technical">Technical Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Please type your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-8 bg-blue-50 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Other Ways to Connect
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="bg-blue-100 inline-flex items-center justify-center w-12 h-12 rounded-full mb-3">
                    <span className="text-blue-600 text-xl">📝</span>
                  </div>
                  <h4 className="font-medium text-gray-800">Guest Posting</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Interested in writing for my blog?
                  </p>
                  <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800 transition-colors">
                    Learn more →
                  </button>
                </div>

                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="bg-green-100 inline-flex items-center justify-center w-12 h-12 rounded-full mb-3">
                    <span className="text-green-600 text-xl">📢</span>
                  </div>
                  <h4 className="font-medium text-gray-800">Advertising</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Promote your brand on my platform
                  </p>
                  <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800 transition-colors">
                    View options →
                  </button>
                </div>

                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="bg-purple-100 inline-flex items-center justify-center w-12 h-12 rounded-full mb-3">
                    <span className="text-purple-600 text-xl">🤝</span>
                  </div>
                  <h4 className="font-medium text-gray-800">Partnerships</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Let's work together on projects
                  </p>
                  <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800 transition-colors">
                    Collaborate →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
