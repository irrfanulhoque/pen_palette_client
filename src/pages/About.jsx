import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBullseye, FaHeart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-black to-purple-900 text-white min-h-screen">
      <Helmet>
        <title>PenPalette | About Us</title>
      </Helmet>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-96 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4 glitch-effect"
        >
          About <span className="text-purple-500">PenPalette</span>
        </motion.h1>
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 max-w-2xl"
        >
          At PenPalette, we believe in the power of words to color the world with ideas. Our platform
          connects creators and readers in a vibrant community of storytelling and inspiration.
        </motion.p>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <FaBullseye className="text-4xl text-purple-500" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-gray-700">
              To empower storytellers by providing an intuitive platform where creativity flows
              seamlessly, and ideas find their audience.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <FaHeart className="text-4xl text-purple-500" />
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-gray-700">
              To be the go-to creative hub where every word paints a masterpiece and every writer feels
              at home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Chen", role: "Founder & CEO", img: "https://i.ibb.co/pjXmWHff/image.png" },
              { name: "Patel", role: "Head of Community", img: "https://i.ibb.co/b5q53rCv/image.png" },
              { name: "Ravi Kumar", role: "Lead Developer", img: "https://i.ibb.co/zVNqNfMm/image.png" },
              { name: "Lena Müller", role: "Creative Director", img: "https://i.ibb.co/8LM3xNJj/image.png" },
            ].map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg backdrop-blur-md"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-gray-300">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaUsers />, title: "Community", desc: "We prioritize our members' voices." },
              { icon: <FaBullseye />, title: "Excellence", desc: "We strive for top-notch quality." },
              { icon: <FaHeart />, title: "Passion", desc: "We create with heart and soul." },
              { icon: <FaUsers />, title: "Innovation", desc: "We embrace new ideas constantly." },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition duration-300"
              >
                <div className="text-4xl text-purple-500 mb-4 inline-block">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-16 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to join the creative journey?
        </h2>
        <button className="px-8 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-all duration-300">
          Get Started
        </button>
      </motion.section>
    </div>
  );
};

export default About;
