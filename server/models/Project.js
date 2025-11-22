const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  githubLink: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  imageFit: {
    type: String,
    enum: ['cover', 'contain'],
    default: 'cover',
  },
  stars: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', projectSchema);
