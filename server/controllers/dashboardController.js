const Project = require('../models/Project');
const Analytics = require('../models/Analytics');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();

    // Get total views and stars
    const projects = await Project.find();
    const totalViews = projects.reduce((sum, project) => sum + project.views, 0);
    const totalStars = projects.reduce((sum, project) => sum + project.stars, 0);

    // Get top 5 viewed projects
    const topViewed = await Project.find()
      .sort('-views')
      .limit(5)
      .select('title views imageUrl');

    // Get top 5 starred projects
    const topStarred = await Project.find()
      .sort('-stars')
      .limit(5)
      .select('title stars imageUrl');

    // Get recent projects
    const recentProjects = await Project.find()
      .sort('-createdAt')
      .limit(5);

    // Get or create analytics
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = await Analytics.create({
        totalViews,
        totalStars,
        visitorCount: 0,
      });
    }

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalViews,
        totalStars,
        visitorCount: analytics.visitorCount,
        topViewed,
        topStarred,
        recentProjects,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching dashboard stats', error: error.message });
  }
};

// Increment visitor count
exports.incrementVisitor = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = await Analytics.create({ visitorCount: 1 });
    } else {
      analytics.visitorCount += 1;
      analytics.lastUpdated = Date.now();
      await analytics.save();
    }

    res.json({ success: true, visitorCount: analytics.visitorCount });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error incrementing visitor', error: error.message });
  }
};
