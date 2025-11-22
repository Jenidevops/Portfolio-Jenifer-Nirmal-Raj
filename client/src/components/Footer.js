import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darker border-t border-primary/20 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">Portfolio</h3>
            <p className="text-gray-400">
              Building amazing projects with passion and creativity
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-primary mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-gray-400 hover:text-primary transition-colors">
                About
              </a>
              <a href="/projects" className="block text-gray-400 hover:text-primary transition-colors">
                Projects
              </a>
              <a href="/resume" className="block text-gray-400 hover:text-primary transition-colors">
                Resume
              </a>
              <a href="/admin" className="block text-gray-400 hover:text-primary transition-colors">
                Admin
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-primary mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://github.com/Jenidevops"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-primary transition-all hover:scale-110"
              >
                <AiFillGithub />
              </a>
              <a
                href="https://linkedin.com/in/jenidevops"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-primary transition-all hover:scale-110"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="mailto:jenidevops@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-primary transition-all hover:scale-110"
              >
                <HiMail />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20 text-center">
          <p className="text-gray-400">
            © {currentYear} All Rights Reserved. Jenifer Nirmal Raj
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed and Developed with{' '}
            <span className="text-accent">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
