const jwt = require('jsonwebtoken');

const tokenSigner = async (payload) => {
    try {
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }); // Example: Token expires in 1 hour
        return token;
    } catch (error) {
        console.error('Error signing token:', error);
        throw new Error('Error in tokenSign');
    }
};


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
    if (!token) {
        return res.status(403).json({ message: 'Invalid token format' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded; // Pass decoded token to the next middleware
        next();
    });
};

module.exports = { tokenSigner, verifyToken };
