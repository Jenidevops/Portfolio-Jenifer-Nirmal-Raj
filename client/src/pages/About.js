import React from 'react';
import { motion } from 'framer-motion';
import TechStack from '../components/TechStack';
import { AiOutlineCode, AiOutlineRocket, AiOutlineBulb } from 'react-icons/ai';
import { FaMicroscope, FaGraduationCap, FaGithub } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';

const About = () => {
  const journey = [
    {
      icon: <FaGraduationCap />,
      title: "Biotechnology Background",
      description: "10+ years in biotechnology research, developing strong analytical thinking and problem-solving skills",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaMicroscope />,
      title: "The Transition",
      description: "Discovered passion for technology and software development, bringing research precision to coding",
      color: "from-cyan-500 to-purple-500"
    },
    {
      icon: <BiCodeAlt />,
      title: "Full Stack Developer",
      description: "Since 2021, mastering MERN stack and building 15+ production-ready applications",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <AiOutlineRocket />,
      title: "Impact & Growth",
      description: "Improved application performance by 40%, optimized APIs, and delivered scalable solutions",
      color: "from-pink-500 to-red-500"
    }
  ];

  const achievements = [
    { number: "15+", label: "Projects Completed", icon: <AiOutlineCode /> },
    { number: "40%", label: "Performance Boost", icon: <AiOutlineRocket /> },
    { number: "10+", label: "Years Research", icon: <FaMicroscope /> },
    { number: "100%", label: "Dedication", icon: <AiOutlineBulb /> }
  ];

  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Know Who <span className="gradient-text">I AM</span>
          </h1>
          <p className="text-xl text-gray-400">From Biotechnology to Building Digital Solutions</p>
        </motion.div>

        {/* Hero Section with Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-8">
              <h2 className="text-3xl font-bold mb-4 gradient-text">My Story</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Hi Everyone! I'm{' '}
                  <span className="text-primary font-semibold">Jenifer Nirmal Raj</span>, 
                  a passionate <span className="text-primary font-semibold">Full Stack Developer</span> based in{' '}
                  <span className="text-primary font-semibold">San Clemente, California</span>.
                </p>
                <p>
                  My journey into tech is unique - I spent over <span className="text-primary font-semibold">10 years in biotechnology research</span>, 
                  where I developed strong analytical thinking and problem-solving skills. In 2021, I discovered my true passion: 
                  <span className="text-primary font-semibold"> building innovative software solutions</span>.
                </p>
                <p>
                  I specialize in the <span className="text-primary font-semibold">MERN stack</span> and have built 
                  <span className="text-primary font-semibold"> 15+ full-stack applications</span>, achieving up to 
                  <span className="text-primary font-semibold"> 40% performance improvements</span> through optimized code and well-structured APIs.
                </p>
                <p>
                  I bring the precision of scientific research to every line of code I write, creating scalable, 
                  user-focused applications that make a real difference.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-primary to-accent rounded-full animate-float opacity-20 blur-3xl absolute"></div>
              <img
                src="/about.png"
                alt="About Me"
                className="w-full max-w-md animate-float relative z-10"
              />
            </div>
          </motion.div>
        </div>

        {/* Achievements Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-6 text-center hover:border-primary/50 transition-all hover:transform hover:scale-105"
            >
              <div className="text-4xl text-primary mb-2 flex justify-center">{achievement.icon}</div>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{achievement.number}</div>
              <div className="text-gray-400 text-sm">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            My <span className="gradient-text">Journey</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journey.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-6 h-full hover:border-primary/50 transition-all hover:transform hover:scale-105">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-3xl text-white mb-4 mx-auto`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3 text-primary">{step.title}</h3>
                  <p className="text-gray-400 text-center text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < journey.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills & Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">What I Do</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary mr-3">▹</span>
                  <span>Build scalable full-stack applications using <strong className="text-primary">MERN Stack</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">▹</span>
                  <span>Design and implement <strong className="text-primary">RESTful APIs</strong> with optimized performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">▹</span>
                  <span>Create responsive, modern UIs with <strong className="text-primary">React & Tailwind CSS</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">▹</span>
                  <span>Implement robust authentication and <strong className="text-primary">database solutions</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Beyond Coding</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary mr-3">▹</span>
                  <span>UI/UX Design & Prototyping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">▹</span>
                  <span>Photography & Visual Arts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">▹</span>
                  <span>Sports & Fitness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">▹</span>
                  <span>Open Source Contributions</span>
                </li>
              </ul>
              <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-gray-400">
                "Strive to build things that make a difference!"
              </blockquote>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <TechStack />

        {/* GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            My <span className="gradient-text">Coding Journey</span>
          </h2>
          <div className="bg-darker/50 backdrop-blur-sm rounded-xl border border-primary/20 p-8">
            <div className="text-center space-y-6">
              <FaGithub className="text-6xl text-primary mx-auto" />
              <h3 className="text-2xl font-bold">Active on GitHub</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                I'm consistently building and contributing to projects. Check out my GitHub profile 
                <a 
                  href="https://github.com/Jenidevops" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors ml-2 font-semibold"
                >
                  @Jenidevops
                </a>
                {' '}to see my latest work and contributions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-dark/50 rounded-lg p-6 border border-primary/10">
                  <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                  <div className="text-gray-400">Repositories</div>
                </div>
                <div className="bg-dark/50 rounded-lg p-6 border border-primary/10">
                  <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                  <div className="text-gray-400">Commits This Year</div>
                </div>
                <div className="bg-dark/50 rounded-lg p-6 border border-primary/10">
                  <div className="text-3xl font-bold gradient-text mb-2">Daily</div>
                  <div className="text-gray-400">Coding Streak</div>
                </div>
              </div>
              <a
                href="https://github.com/Jenidevops"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-8 py-3 bg-primary/10 border border-primary rounded-lg hover:bg-primary/20 transition-all hover:scale-105"
              >
                Visit My GitHub Profile
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
