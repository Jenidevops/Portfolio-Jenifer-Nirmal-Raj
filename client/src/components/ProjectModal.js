import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose, AiFillGithub, AiFillStar, AiOutlineEye } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';

const ProjectModal = ({ project, onClose, onStar }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-darker border border-primary/20 rounded-2xl max-w-4xl w-full my-8 relative"
        >
          {/* Close Button - Fixed position */}
          <button
            onClick={onClose}
            className="sticky top-4 left-full -translate-x-16 z-50 bg-red-500/80 backdrop-blur-sm p-3 rounded-full hover:bg-red-500 transition-all hover:scale-110 shadow-xl"
          >
            <AiOutlineClose className="text-2xl" />
          </button>

          {/* Header with Image */}
          <div className="relative h-96 overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/10 to-accent/10 -mt-16">
            <img
              src={project.imageUrl || '/project-placeholder.svg'}
              alt={project.title}
              className={`w-full h-full ${
                project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

            {/* Title on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                {project.title}
              </h2>
              <div className="flex gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-primary transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <AiFillGithub className="text-xl" />
                    <span>View Code</span>
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-primary transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <BiLinkExternal className="text-xl" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xl font-bold mb-3 gradient-text">About This Project</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3 gradient-text">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-full hover:bg-primary/20 transition-colors font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats and Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-primary/20">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <AiFillStar className="text-2xl" />
                  <span className="text-lg font-semibold">{project.stars || 0} Stars</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <AiOutlineEye className="text-2xl" />
                  <span className="text-lg font-semibold">{project.views || 0} Views</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onStar(project._id);
                  onClose();
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary hover:scale-105 transition-all font-semibold"
              >
                <AiFillStar className="text-yellow-400 text-xl" />
                <span>Star This Project</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
