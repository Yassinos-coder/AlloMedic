const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.bigDaddy); // Replace with your secret key
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.bigDaddy, {});
  return token;
};

module.exports = { verifyToken, generateToken };
