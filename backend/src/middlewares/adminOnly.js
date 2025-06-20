const admin = (req, res, next) => {
  try {
    const user = req.user;
    if (user && user?.roles?.includes("admin")) {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Admin Access Only" });
  }
};

module.exports = admin;
