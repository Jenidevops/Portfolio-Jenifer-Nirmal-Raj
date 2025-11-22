import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import ImageUpload from '../components/ImageUpload';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineSave, AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useAdmin } from '../context/AdminContext';

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin: isAdminContext, login: contextLogin } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
    // Redirect to admin login if logged out via context (e.g., from navbar)
    if (!isAdminContext && isAuthenticated) {
      setIsAuthenticated(false);
      navigate('/admin');
      return;
    }

    // Check if already logged in via context
    if (isAdminContext) {
      setIsAuthenticated(true);
      fetchProjects();
      fetchStats();
    } else if (isAuthenticated) {
      fetchProjects();
      fetchStats();
    } else {
      // Load saved credentials if remember me was enabled (but don't auto-login)
      const savedUsername = localStorage.getItem('adminUsername');
      const savedPassword = localStorage.getItem('adminPassword');
      const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
      if (savedUsername && savedPassword && savedRememberMe) {
        setUsername(savedUsername);
        setPassword(savedPassword);
        setRememberMe(true);
        // Don't auto-login - just pre-fill the form
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAdminContext]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check username
    if (username !== 'admin_portfolio') {
      alert('Invalid username');
      return;
    }
    
    try {
      const response = await api.post('/dashboard/stats', { password });
      if (response.data.success) {
        setIsAuthenticated(true);
        setStats(response.data.stats);
        contextLogin(password);
        
        // Save credentials if remember me is checked
        if (rememberMe) {
          localStorage.setItem('adminUsername', username);
          localStorage.setItem('adminPassword', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('adminUsername');
          localStorage.removeItem('adminPassword');
          localStorage.removeItem('rememberMe');
        }
      }
    } catch (error) {
      alert('Invalid password');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.post('/dashboard/stats', { password });
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        password,
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, data);
      } else {
        await api.post('/projects', data);
      }

      setShowForm(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
      fetchStats();
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
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
    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${projectId}`, {
        data: { password },
      });
      fetchProjects();
      fetchStats();
    } catch (error) {
      alert('Error deleting project: ' + error.message);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-darker/50 backdrop-blur-sm rounded-xl p-8 max-w-md w-full border border-primary/20"
        >
          <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-darker border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-darker border border-primary/30 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye className="text-xl" />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-primary/30 bg-darker text-primary focus:ring-primary"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer">
                Remember me
              </label>
            </div>
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, admin_portfolio!</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingProject(null);
              resetForm();
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <AiOutlinePlus />
            <span>Add Project</span>
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-darker/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
              <h3 className="text-gray-400 text-sm mb-2">Total Projects</h3>
              <p className="text-4xl font-bold gradient-text">{stats.totalProjects}</p>
            </div>
            <div className="bg-darker/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
              <h3 className="text-gray-400 text-sm mb-2">Total Views</h3>
              <p className="text-4xl font-bold text-blue-400">{stats.totalViews}</p>
            </div>
            <div className="bg-darker/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
              <h3 className="text-gray-400 text-sm mb-2">Total Stars</h3>
              <p className="text-4xl font-bold text-yellow-400">{stats.totalStars}</p>
            </div>
            <div className="bg-darker/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20">
              <h3 className="text-gray-400 text-sm mb-2">Visitors</h3>
              <p className="text-4xl font-bold text-green-400">{stats.visitorCount}</p>
            </div>
          </div>
        )}

        {/* Project Form Modal */}
        {showForm && (
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
                    setShowForm(false);
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
                        <strong>Cover</strong> - Fill space (crop if needed)
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
                  <p className="text-xs text-gray-500 mt-2">
                    Cover fills the entire space (may crop). Contain shows the full image (may have empty space).
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-400">Featured Project</span>
                  </label>

                  <div className="flex-1">
                    <label className="block text-sm text-gray-400 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full bg-dark border border-primary/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                      placeholder="1, 2, 3..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Lower numbers show first (1 = first, 2 = second, etc.)
                    </p>
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

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">All Projects</h2>
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-darker/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">{project.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>⭐ {project.stars || 0}</span>
                  <span>👁 {project.views || 0}</span>
                  {project.featured && <span className="text-primary">⚡ Featured</span>}
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <AiOutlineEdit className="text-xl" />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <AiOutlineDelete className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
