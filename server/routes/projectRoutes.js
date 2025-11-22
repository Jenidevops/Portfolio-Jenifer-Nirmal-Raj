const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const projectController = require('../controllers/projectController');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/:id/star', projectController.addStar);

// Admin routes (password-protected)
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('githubLink').notEmpty().withMessage('GitHub link is required'),
  ],
  adminAuth,
  projectController.createProject
);

router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('githubLink').optional().notEmpty().withMessage('GitHub link cannot be empty'),
  ],
  adminAuth,
  projectController.updateProject
);

router.delete('/:id', adminAuth, projectController.deleteProject);

module.exports = router;
