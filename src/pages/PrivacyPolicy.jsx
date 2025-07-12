import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-black to-purple-900 text-white min-h-screen py-16">
      <Helmet>
        <title>PenPalette | Privacy Policy</title>
      </Helmet>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center px-6 mb-12"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4 glitch-effect"
        >
          Privacy <span className="text-purple-500">Policy</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-gray-300"
        >
          We value your privacy. This page explains how PenPalette collects, uses, and protects your data.
        </motion.p>
      </motion.section>

      {/* Policy Content */}
      <div className="container mx-auto px-6 sm:px-8 space-y-12 text-gray-200">
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">1. Information Collection</h2>
          <p className="mb-2">
            We may collect personal information such as your name, email, and profile details when you register or interact with our platform.
          </p>
          <p>
            Non-personal data like browser type, IP address, and usage analytics are also gathered to improve our service.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">2. Use of Data</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Service Improvement:</strong> Enhance user experience and site performance.</li>
            <li><strong>Communication:</strong> Send updates, newsletters, and respond to inquiries.</li>
            <li><strong>Analytics:</strong> Monitor trends and user engagement metrics.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">3. Data Security</h2>
          <p>
            We implement encryption, secure servers, and best practices to protect your information from unauthorized access.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">4. Cookies & Tracking</h2>
          <p>
            Cookies, web beacons, and similar technologies are used for functionality and analytics. You can disable cookies in your browser settings.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">5. Third-Party Services</h2>
          <p>
            We may share data with third-party service providers (e.g., hosting, analytics). They adhere to privacy standards.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">6. Children’s Privacy</h2>
          <p>
            Our platform is not intended for children under 13. If you suspect we collected data from a minor, contact us to remove it.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">7. Changes to Policy</h2>
          <p>
            We may update this policy; the revised date will be listed at the top. Continued use implies acceptance of changes.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-3xl font-bold mb-4">8. Contact Information</h2>
          <p>
            For privacy inquiries, email us at{' '}
            <a href="mailto:privacy@penpalette.com" className="text-purple-400 underline">
              privacy@penpalette.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;