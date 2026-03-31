import { pool } from "../db/db.js";

//save user after firebase login
export const saveUser = async (req, res) => {
    try {
        const { uid, email } = req.user;
        const existing = await pool.query("SELECT * FROM users WHERE firebase_uid=$1", [uid]);

        if (existing.rows.length === 0) {
            await pool.query("INSERT INTO users (firebase_uid, email) VALUES ($1, $2)", [uid, email]);
            return res.status(201).json({ message: "User saved" })
        }
        return res.status(200).json({ message: "User already exists" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}