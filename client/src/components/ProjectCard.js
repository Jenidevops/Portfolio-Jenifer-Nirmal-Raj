import React from 'react';
import { AiFillGithub, AiOutlineEye, AiFillStar, AiOutlineStar, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onStar, onView, onEdit, onDelete, isAdmin }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-darker/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
      onClick={() => onView && onView(project)}
    >
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <img
          src={project.imageUrl || '/project-placeholder.svg'}
          alt={project.title}
          className={`w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 ${
            project.imageFit === 'contain' ? 'object-contain bg-dark/50' : 'object-cover'
          }`}
          style={{
            filter: 'contrast(1.1) saturate(1.2) brightness(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
        
        {/* Admin Quick Actions */}
        {isAdmin && (
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(project);
              }}
              className="bg-blue-500/80 backdrop-blur-sm p-2 rounded-full hover:bg-blue-500 transition-all hover:scale-110"
              title="Edit Project"
            >
              <AiOutlineEdit className="text-lg" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(project._id);
              }}
              className="bg-red-500/80 backdrop-blur-sm p-2 rounded-full hover:bg-red-500 transition-all hover:scale-110"
              title="Delete Project"
            >
              <AiOutlineDelete className="text-lg" />
            </button>
          </div>
        )}
        
        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {project.title}
          </h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-primary transition-all hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <AiFillGithub className="text-lg" />
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-primary transition-all hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <BiLinkExternal className="text-lg" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Tags - Clean separated design */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 5).map((tag, index) => (
              <span 
                key={index} 
                className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary/20 to-accent/20 text-white border border-primary/40 rounded-lg hover:from-primary/30 hover:to-accent/30 transition-all shadow-sm"
              >
                {tag}
              </span>
            ))}
            {project.tags?.length > 5 && (
              <span className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary/60 border border-primary/30 rounded-lg">
                +{project.tags.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-yellow-400">
              <AiFillStar className="text-lg" />
              <span className="text-sm font-semibold">{project.stars || 0}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <AiOutlineEye className="text-lg" />
              <span className="text-sm font-semibold">{project.views || 0}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onStar && onStar(project._id);
            }}
            className="flex items-center space-x-1 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary hover:scale-105 transition-all text-sm font-semibold"
          >
            <AiOutlineStar className="text-yellow-400" />
            <span>Star</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
