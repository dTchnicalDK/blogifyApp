// ComingSoon.jsx
import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set launch date (2 weeks from now)
      const launchDate = new Date();
      launchDate.setDate(launchDate.getDate() + 14);

      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! We'll notify you at ${email} when we launch.`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-gray-800">
            <span className="text-indigo-600">My</span>Blogs
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Services
            </a>
            <a
              href="/"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Something Amazing is Coming Soon
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            We're working hard to bring you an incredible experience. Our new
            website is under construction and will be launched soon.
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16">
            <div className="countdown-box bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-indigo-600">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-gray-500 mt-2">Days</div>
            </div>
            <div className="countdown-box bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-indigo-600">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-gray-500 mt-2">Hours</div>
            </div>
            <div className="countdown-box bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-indigo-600">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-gray-500 mt-2">Minutes</div>
            </div>
            <div className="countdown-box bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-indigo-600">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-gray-500 mt-2">Seconds</div>
            </div>
          </div>

          {/* Notification Form */}
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get Notified When We Launch
            </h2>
            <p className="text-gray-600 mb-6">
              Join our mailing list to receive updates and early access
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                Notify Me
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors text-2xl"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors text-2xl"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors text-2xl"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors text-2xl"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p>© 2023 NovaTech. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon;
