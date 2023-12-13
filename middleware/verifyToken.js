import jwt from 'jsonwebtoken';
// Middleware for token verification
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send('Token is missing');
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    req.username = decoded.username; // Set the username in the request object
    next();
  });
};
