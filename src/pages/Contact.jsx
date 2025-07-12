import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-black to-purple-900 text-white min-h-screen">
      <Helmet>
        <title>PenPalette | Contact Us</title>
      </Helmet>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-64 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-2 glitch-effect"
        >
          Get in <span className="text-purple-500">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 max-w-2xl"
        >
          We're here to help and answer any questions you might have. Reach out and we'll respond as soon as we can.
        </motion.p>
      </motion.section>

      {/* Contact Details Section */}
      <section className="py-16 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: <FaMapMarkerAlt className="text-4xl text-purple-500 mx-auto" />,
              title: "Our Office",
              desc: "123 PenPalette Lane\nDhaka, Bangladesh",
            },
            {
              icon: <FaPhoneAlt className="text-4xl text-purple-500 mx-auto" />,
              title: "Call Us",
              desc: "+880 1234-567890\nMon - Fri, 9:00-18:00",
            },
            {
              icon: <FaEnvelope className="text-4xl text-purple-500 mx-auto" />,
              title: "Email Us",
              desc: "support@penpalette.com\nWe reply within 24 hours",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="space-y-4"
            >
              {item.icon}
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="whitespace-pre-line">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 sm:px-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Send Us a Message</h2>
          <form className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered bg-transparent text-white border-white focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered bg-transparent text-white border-white focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Message</span>
              </label>
              <textarea
                rows="5"
                placeholder="Your Message"
                className="textarea textarea-bordered bg-transparent text-white border-white focus:ring-2 focus:ring-purple-500"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-64">
        <iframe
          title="PenPalette Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1234567890123!2d90.1234567!3d23.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0abcdef1234:0xabcdef5678901234!2sPenPalette%20Office!5e0!3m2!1sen!2sbd!4v1610000000000!5m2!1sen!2sbd"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-12 text-center"
      >
        <h2 className="text-2xl text-gray-300 mb-4">Still have questions?</h2>
        <button className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-all duration-300">
          Get Support
        </button>
      </motion.section>
    </div>
  );
};

export default Contact;
