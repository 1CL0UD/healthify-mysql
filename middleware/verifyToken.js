import jwt from 'jsonwebtoken';
// Middleware for token verification
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send('Token is missing');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (!decoded) {
      console.error('Decoded token is undefined'); // Log if decoded token is undefined
      return res.status(401).send('Invalid token');
    }
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).send('Invalid token');
    }

    req.username = decoded.username; // Set the username in the request object
    next();
  });
};
