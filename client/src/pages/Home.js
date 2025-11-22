import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import TechStack from '../components/TechStack';

const Home = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi There! <span className="wave">👋🏻</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text whitespace-nowrap">I'm Jenifer Nirmal Raj</span>
            </h2>

            <div className="text-3xl md:text-4xl font-semibold text-primary mb-8">
              <Typewriter
                options={{
                  strings: [
                    'Full Stack Developer',
                    'MERN Stack Expert',
                    'React Specialist',
                    'Problem Solver',
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </div>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Full Stack Developer specializing in the MERN stack with experience building 
              scalable, user-focused web applications. Skilled in React, Node.js, Express, 
              MongoDB, and modern UI frameworks. Developed 15+ full-stack applications with 
              optimized performance and well-structured APIs.
            </p>

            <div className="flex items-center space-x-4 mb-8">
              <Link to="/projects" className="btn-primary">
                View Projects
              </Link>
              <a
                href="/resume"
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-400">Connect with me:</p>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/Jenidevops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-primary/10 border border-primary/30 rounded-full hover:bg-primary hover:scale-110 transition-all"
                >
                  <AiFillGithub className="text-2xl" />
                </a>
                <a
                  href="https://linkedin.com/in/jenidevops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-primary/10 border border-primary/30 rounded-full hover:bg-primary hover:scale-110 transition-all"
                >
                  <FaLinkedinIn className="text-2xl" />
                </a>
                <a
                  href="mailto:jenidevops@gmail.com"
                  className="w-12 h-12 flex items-center justify-center bg-primary/10 border border-primary/30 rounded-full hover:bg-primary hover:scale-110 transition-all"
                >
                  <HiMail className="text-2xl" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Animated Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-primary to-accent rounded-full animate-float opacity-20 blur-3xl absolute"></div>
              <img
                src="/home-main.svg"
                alt="Hero"
                className="w-full h-auto animate-float relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <TechStack />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">
              LET ME <span className="gradient-text">INTRODUCE</span> MYSELF
            </h2>
            <div className="max-w-3xl mx-auto text-gray-400 text-lg space-y-4">
              <p>
                I fell in love with programming and transitioned from a successful career 
                in biotechnology research to become a passionate Full Stack Developer! 🚀
              </p>
              <p>
                I am fluent in modern web technologies like{' '}
                <span className="text-primary font-semibold">
                  JavaScript, TypeScript, React, and Node.js
                </span>
                .
              </p>
              <p>
                My field of interest is building scalable{' '}
                <span className="text-primary font-semibold">
                  Web Applications and Products
                </span>{' '}
                using the{' '}
                <span className="text-primary font-semibold">
                  MERN Stack
                </span>
                . I bring analytical thinking and problem-solving skills from my research background.
              </p>
              <p>
                Whenever possible, I apply my passion for developing
                production-ready applications with{' '}
                <span className="text-primary font-semibold">
                  Node.js, Express, MongoDB
                </span>{' '}
                and{' '}
                <span className="text-primary font-semibold">
                  Modern JavaScript Frameworks
                </span>{' '}
                like{' '}
                <span className="text-primary font-semibold">
                  React.js and Redux
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Find Me Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            FIND ME ON
          </h2>
          <p className="text-gray-400 mb-8">
            Feel free to <span className="text-primary font-semibold">connect</span> with me
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/Jenidevops"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 flex items-center justify-center bg-darker border border-primary/30 rounded-full hover:bg-primary hover:scale-110 hover:animate-glow transition-all"
            >
              <AiFillGithub className="text-3xl" />
            </a>
            <a
              href="https://linkedin.com/in/jenidevops"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 flex items-center justify-center bg-darker border border-primary/30 rounded-full hover:bg-primary hover:scale-110 hover:animate-glow transition-all"
            >
              <FaLinkedinIn className="text-3xl" />
            </a>
            <a
              href="mailto:jenidevops@gmail.com"
              className="w-16 h-16 flex items-center justify-center bg-darker border border-primary/30 rounded-full hover:bg-primary hover:scale-110 hover:animate-glow transition-all"
            >
              <HiMail className="text-3xl" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
