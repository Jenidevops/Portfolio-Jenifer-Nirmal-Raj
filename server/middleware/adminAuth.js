const adminAuth = (req, res, next) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!password) {
    return res.status(401).json({ success: false, message: 'Password required' });
  }

  if (password !== adminPassword) {
    return res.status(403).json({ success: false, message: 'Invalid admin password' });
  }

  next();
};

module.exports = adminAuth;
