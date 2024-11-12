const jwt = require('jsonwebtoken');

const tokenSigner = async (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    if (token) {
        return token;
    } else {
        return 'Error in tokenSign';
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = { tokenSigner, verifyToken };
