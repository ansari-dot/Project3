import jwt from 'jsonwebtoken';

export const auth = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "climate-guardian-secret");
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};