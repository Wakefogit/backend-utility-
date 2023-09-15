const jwt = require('jsonwebtoken');
const secretKey = 'SecretKey'; 

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdminPermission(req, res, next) {
    const user = req.user;
   
    // Assuming 'roleId' field determines admin role (e.g., roleId = 1 for admin)
    if (user && user.roleID === 1) {
      next();
    } else {
      res.status(403).json({ error: 'Permission denied' });
    }
  }
module.exports = {authenticateToken,requireAdminPermission};