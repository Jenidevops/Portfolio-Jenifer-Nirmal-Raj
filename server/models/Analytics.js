const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  totalViews: {
    type: Number,
    default: 0,
  },
  totalStars: {
    type: Number,
    default: 0,
  },
  visitorCount: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
