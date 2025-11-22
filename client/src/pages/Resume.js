import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineDownload, AiOutlineEye } from 'react-icons/ai';
import TechStack from '../components/TechStack';

const Resume = () => {
  const resumePdfLink = '/resume.pdf';

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = resumePdfLink;
    link.download = 'Jenifer_Nirmal_Raj_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Full Stack Developer (MERN Stack) | 15+ Production-Ready Applications
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownload}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <AiOutlineDownload />
              <span>Download Resume</span>
            </button>
            <a
              href={resumePdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all inline-flex items-center space-x-2"
            >
              <AiOutlineEye />
              <span>View Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Resume Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-6 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">15+</div>
            <div className="text-gray-400">Full-Stack Projects</div>
          </div>
          <div className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-6 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">4+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-6 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">10+</div>
            <div className="text-gray-400">Technologies</div>
          </div>
        </motion.div>

        {/* Key Skills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="gradient-text">Technical Expertise</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Frontend</h3>
              <p className="text-gray-300">
                React, Vite, JavaScript, TypeScript, Redux, Tailwind CSS, HTML5, CSS3, Bootstrap
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Backend</h3>
              <p className="text-gray-300">
                Node.js, Express, REST APIs, JWT Authentication
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Database</h3>
              <p className="text-gray-300">
                MongoDB, Mongoose, PostgreSQL, MySQL, Redis
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">Tools & Deployment</h3>
              <p className="text-gray-300">
                Git, GitHub, Postman, CI/CD, Vercel, Netlify, VS Code, npm, Figma
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Achievements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            <span className="gradient-text">Key Achievements</span>
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-primary mr-2">▹</span>
              <span>Developed and deployed 15+ full-stack, production-ready applications</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">▹</span>
              <span>Optimized application performance, achieving up to 40% faster load times</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">▹</span>
              <span>Built scalable REST APIs with structured architecture and error handling</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">▹</span>
              <span>Transitioned from 10+ years in biotechnology research to software development</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">▹</span>
              <span>Expertise in MERN stack with modern UI frameworks and cloud deployment</span>
            </li>
          </ul>
        </motion.div>

        {/* Tech Stack */}
        <TechStack />
      </div>
    </div>
  );
};

export default Resume;
