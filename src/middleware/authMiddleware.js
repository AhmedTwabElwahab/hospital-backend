const JWT = require('jsonwebtoken');
require('dotenv').config()
const {SECRET_ACCESS_TOKEN} = process.env;

/**
 * Middleware for auth JWT token
 *  
 */
function auth(req, res, next) {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    // Verify and decode the token
    JWT.verify(token, SECRET_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      // Add the decoded user information to the request object
      req.user = decoded;
      next();
    });
}

module.exports = {auth};