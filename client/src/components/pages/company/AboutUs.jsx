import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Academic Insight Hub
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Empowering students with targeted study strategies, uncommon
            resources, and the knowledge to excel academically
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white transform skew-y-2 -mb-6"></div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Academic Insight Hub, we're dedicated to transforming how
                students approach learning. We believe that every student has
                unique potential that can be unlocked with the right strategies
                and resources.
              </p>
              <p className="text-lg text-gray-600">
                Unlike traditional study sites, we focus on providing uncommon
                study materials and evidence-based learning strategies that go
                beyond standard curriculum to help students develop critical
                thinking and deep understanding of their subjects.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl text-center">
                    <div className="text-4xl text-blue-600 mb-3">📚</div>
                    <h3 className="font-semibold text-gray-800">
                      Uncommon Resources
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Materials you won't find elsewhere
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl text-center">
                    <div className="text-4xl text-green-600 mb-3">🧠</div>
                    <h3 className="font-semibold text-gray-800">
                      Learning Strategies
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Evidence-based study techniques
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl text-center">
                    <div className="text-4xl text-purple-600 mb-3">🎯</div>
                    <h3 className="font-semibold text-gray-800">
                      Targeted Approach
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Focused on specific academic needs
                    </p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl text-center">
                    <div className="text-4xl text-orange-600 mb-3">🚀</div>
                    <h3 className="font-semibold text-gray-800">
                      Academic Excellence
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Designed to help you excel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            What Makes Us Different
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-500">
              <div className="text-3xl text-blue-600 mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Deep-Dive Content
              </h3>
              <p className="text-gray-600">
                We go beyond surface-level explanations to provide comprehensive
                understanding of complex topics.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-500">
              <div className="text-3xl text-green-600 mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Efficiency Focused
              </h3>
              <p className="text-gray-600">
                Our strategies are designed to maximize learning while
                minimizing time investment.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-purple-500">
              <div className="text-3xl text-purple-600 mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Creative Approaches
              </h3>
              <p className="text-gray-600">
                We employ unconventional methods that make learning engaging and
                memorable.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-red-500">
              <div className="text-3xl text-red-600 mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Research-Backed
              </h3>
              <p className="text-gray-600">
                All our content is grounded in cognitive science and educational
                research.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <div className="text-3xl text-yellow-600 mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Adaptive Learning
              </h3>
              <p className="text-gray-600">
                Content tailored to different learning styles and academic
                levels.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-indigo-500">
              <div className="text-3xl text-indigo-600 mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Community Driven
              </h3>
              <p className="text-gray-600">
                Built with feedback from students and educators to address real
                academic challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Our Academic Team
          </h2>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Our content is created by educators, researchers, and top-performing
            students who understand academic challenges
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">👩‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Subject Experts
              </h3>
              <p className="text-gray-600 mt-2">
                PhD holders and specialists in their fields
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🧑‍🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Top Students
              </h3>
              <p className="text-gray-600 mt-2">
                Current students who excel academically
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">👨‍🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Researchers
              </h3>
              <p className="text-gray-600 mt-2">
                Experts in learning science and pedagogy
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">👩‍💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Content Developers
              </h3>
              <p className="text-gray-600 mt-2">
                Specialists in creating effective learning materials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <p className="text-lg">In-Depth Study Guides</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <p className="text-lg">Students Supported</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <p className="text-lg">Reported Grade Improvement</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <p className="text-lg">Academic Subjects Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Academic Journey?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Join thousands of students who have discovered better ways to learn,
            study, and excel academically
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              Explore Study Resources
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg border border-blue-600 transition-colors duration-300">
              Join Our Community
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg">Academic Insight Hub</p>
            <p className="mt-2">
              Empowering students through knowledge, strategy, and uncommon
              resources
            </p>
            <p className="mt-8">
              © {new Date().getFullYear()} Academic Insight Hub. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
