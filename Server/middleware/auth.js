const jwt = require("jsonwebtoken");
const authMiddleware = (role = []) => {
    if (typeof role === "string") {
        role = [role];
    }
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split("")[1];
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' })
            }
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
            if (role.length > 0 && !role.includes(decodedToken.role)) {
                return res.status(403).json({ message: 'Forbidden' })
            }
            next();
        } catch (err) {
            return res.status(401).json({ message: 'invalid' })
        }
    }
}
module.exports = authMiddleware;