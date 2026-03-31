import admin from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token" })
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // contains uid, email
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ message: "Invalid token", error: err.message })
    }
}