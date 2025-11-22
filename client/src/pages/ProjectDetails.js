import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import {
  AiFillGithub,
  AiOutlineEye,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import { BsArrowLeft } from 'react-icons/bs';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasStarred, setHasStarred] = useState(false);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data.project);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStar = async () => {
    if (hasStarred) {
      alert('You have already starred this project!');
      return;
    }

    try {
      await api.post(`/projects/${id}/star`);
      setHasStarred(true);
      fetchProject();
    } catch (error) {
      console.error('Error starring project:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary mb-8 transition-colors"
        >
          <BsArrowLeft />
          <span>Back to Projects</span>
        </Link>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">{project.title}</h1>
          
          {/* Stats */}
          <div className="flex items-center space-x-6 text-gray-400 mb-6">
            <div className="flex items-center space-x-2">
              <AiFillStar className="text-yellow-400" />
              <span>{project.stars || 0} stars</span>
            </div>
            <div className="flex items-center space-x-2">
              <AiOutlineEye />
              <span>{project.views || 0} views</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag, index) => (
              <span key={index} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center space-x-2"
            >
              <AiFillGithub className="text-xl" />
              <span>View Code</span>
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center space-x-2"
              >
                <BiLinkExternal className="text-xl" />
                <span>Live Demo</span>
              </a>
            )}
            <button
              onClick={handleStar}
              disabled={hasStarred}
              className={`btn-secondary flex items-center space-x-2 ${
                hasStarred ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {hasStarred ? <AiFillStar className="text-yellow-400" /> : <AiOutlineStar />}
              <span>{hasStarred ? 'Starred' : 'Give a Star'}</span>
            </button>
          </div>
        </motion.div>

        {/* Project Image */}
        {project.imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 rounded-xl overflow-hidden border border-primary/20"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto"
            />
          </motion.div>
        )}

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-darker/50 backdrop-blur-sm rounded-xl p-8 border border-primary/20"
        >
          <h2 className="text-2xl font-bold mb-4">About This Project</h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </motion.div>

        {/* Technologies Used */}
        {project.tags && project.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-darker/50 backdrop-blur-sm rounded-xl p-8 border border-primary/20"
          >
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-primary/10 border border-primary/30 rounded-lg px-4 py-3 text-center hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 mb-4">
            Like this project? Give it a star and check out the code!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleStar}
              disabled={hasStarred}
              className={`btn-primary flex items-center space-x-2 ${
                hasStarred ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <AiFillStar className={hasStarred ? 'text-yellow-400' : ''} />
              <span>{hasStarred ? 'Starred!' : 'Star This Project'}</span>
            </button>
            <Link to="/projects" className="btn-secondary">
              View More Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
