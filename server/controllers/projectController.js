const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Get all projects (public)
exports.getAllProjects = async (req, res) => {
  try {
    const { tag, search, featured } = req.query;
    
    let query = {};
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .exec();

    res.json({
      success: true,
      projects,
      total: projects.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching projects', error: error.message });
  }
};

// Get single project (public)
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Increment views
    project.views += 1;
    await project.save();

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching project', error: error.message });
  }
};

// Add star to project (public)
exports.addStar = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project.stars += 1;
    await project.save();

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding star', error: error.message });
  }
};

// Create project (ADMIN ONLY)
exports.createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, tags, githubLink, liveLink, imageUrl, imageFit, featured, order } = req.body;

    const project = await Project.create({
      title,
      description,
      tags,
      githubLink,
      liveLink,
      imageUrl,
      imageFit: imageFit || 'cover',
      featured: featured || false,
      order: order || 0,
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating project', error: error.message });
  }
};

// Update project (ADMIN ONLY)
exports.updateProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const { title, description, tags, githubLink, liveLink, imageUrl, imageFit, featured, order } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.tags = tags || project.tags;
    project.githubLink = githubLink || project.githubLink;
    project.liveLink = liveLink || project.liveLink;
    project.imageUrl = imageUrl || project.imageUrl;
    project.imageFit = imageFit || project.imageFit;
    project.featured = featured !== undefined ? featured : project.featured;
    project.order = order !== undefined ? order : project.order;
    project.updatedAt = Date.now();

    await project.save();

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating project', error: error.message });
  }
};

// Delete project (ADMIN ONLY)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting project', error: error.message });
  }
};
