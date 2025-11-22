import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import api from '../utils/api';
import { AiOutlineSearch, AiOutlinePlus, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';
import ImageUpload from '../components/ImageUpload';
import { useAdmin } from '../context/AdminContext';

const Projects = () => {
  const { isAdmin, adminPassword } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    githubLink: '',
    liveLink: '',
    imageUrl: '',
    imageFit: 'cover',
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedTag, projects]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.projects);
      
      // Extract unique tags
      const tags = [...new Set(response.data.projects.flatMap(p => p.tags || []))];
      setAllTags(tags);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        project =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(project => project.tags?.includes(selectedTag));
    }

    // Sort by order field (ascending), then by creation date (newest first)
    filtered = filtered.sort((a, b) => {
      // First sort by order (lower numbers come first)
      if (a.order !== b.order) {
        return (a.order || 999) - (b.order || 999);
      }
      // If order is same, sort by date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredProjects(filtered);
  };

  const handleStar = async (projectId) => {
    try {
      await api.post(`/projects/${projectId}/star`);
      fetchProjects();
    } catch (error) {
      console.error('Error starring project:', error);
    }
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags?.join(', ') || '',
      githubLink: project.githubLink,
      liveLink: project.liveLink || '',
      imageUrl: project.imageUrl || '',
      imageFit: project.imageFit || 'cover',
      featured: project.featured || false,
      order: project.order || 0,
    });
    setShowEditForm(true);
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${projectId}`, {
        data: { password: adminPassword },
      });
      fetchProjects();
    } catch (error) {
      alert('Error deleting project: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        password: adminPassword,
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, data);
      } else {
        await api.post('/projects', data);
      }

      setShowEditForm(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      githubLink: '',
      liveLink: '',
      imageUrl: '',
      imageFit: 'cover',
      featured: false,
      order: 0,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            My Recent <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Here are a few projects I've worked on recently.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-12 space-y-4">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-darker border border-primary/30 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {(showAllTags ? allTags : allTags.slice(0, 10)).map((tag, index) => (
              <button
                key={index}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`tag-badge ${selectedTag === tag ? 'bg-primary/30 border-primary' : ''}`}
              >
                {tag}
              </button>
            ))}
            {allTags.length > 10 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg hover:bg-primary/20 transition-all text-sm font-medium"
              >
                {showAllTags ? 'Show Less' : `Show More (+${allTags.length - 10})`}
              </button>
            )}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag('')}
                className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all text-sm font-medium"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onStar={handleStar}
                onView={handleViewProject}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No projects found</p>
          </div>
        )}

        {/* Add Project Button for Admin */}
        {isAdmin && (
          <div className="fixed bottom-8 right-8 z-40">
            <button
              onClick={() => {
                setShowEditForm(true);
                setEditingProject(null);
                resetForm();
              }}
              className="btn-primary flex items-center space-x-2 shadow-2xl shadow-primary/50"
            >
              <AiOutlinePlus className="text-xl" />
              <span>Add Project</span>
            </button>
          </div>
        )}

        {/* Project Detail Modal */}
        {showModal && (
          <ProjectModal
            project={selectedProject}
            onClose={() => {
              setShowModal(false);
              setSelectedProject(null);
            }}
            onStar={handleStar}
          />
        )}

        {/* Edit/Add Project Form */}
        {showEditForm && isAdmin && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-darker border border-primary/20 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold gradient-text">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingProject(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <AiOutlineClose className="text-2xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-dark border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-dark border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary h-32"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full bg-dark border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">GitHub Link *</label>
                  <input
                    type="url"
                    value={formData.githubLink}
                    onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                    className="w-full bg-dark border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Live Link</label>
                  <input
                    type="url"
                    value={formData.liveLink}
                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                    className="w-full bg-dark border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project Image</label>
                  <ImageUpload
                    currentImage={formData.imageUrl}
                    onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Paste image URL here:
                  </p>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-dark border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary mt-2"
                    placeholder="/projects/my-image.jpg or https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Image Display</label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="imageFit"
                        value="cover"
                        checked={formData.imageFit === 'cover'}
                        onChange={(e) => setFormData({ ...formData, imageFit: e.target.value })}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-gray-300">
                        <strong>Cover</strong> - Fill space
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="imageFit"
                        value="contain"
                        checked={formData.imageFit === 'contain'}
                        onChange={(e) => setFormData({ ...formData, imageFit: e.target.value })}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-gray-300">
                        <strong>Contain</strong> - Show full image
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded border-primary/30 bg-darker text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-400">Featured Project</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full bg-dark border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                      placeholder="1, 2, 3..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Lower = shows first</p>
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary flex items-center justify-center space-x-2">
                  <AiOutlineSave />
                  <span>{editingProject ? 'Update Project' : 'Create Project'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
