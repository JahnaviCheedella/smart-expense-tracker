import { pool } from "../db.js";

//create
export const CreateExpense = async (req, res) => {
    try {
        const { amount, category, note } = req.body;
        const result = await pool.query("INSERT INTO expenses (amount, category, note) VALUES ($1, $2, $3) RETURNING *", [amount, category, note]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//get all + filter
export const getExpenses = async (req, res) => {
    try {
        const { category, start, end } = req.query;
        let query = "SELECT * FROM expenses WHERE 1=1";
        const values = [];

        if (category) {
            values.push(category);
            query += ` AND category = $${values.length}`
        }

        if (start && end) {
            values.push(start, end);
            query += ` AND created_at BETWEEN $${values.length - 1} AND $${values.length}`;
        }

        query += " ORDER BY created_at DESC";
        const result = await pool.query(query, values)
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//update
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, note } = req.body;
        const result = await pool.query("UPDATE expenses SET amount=$1, category=$2, note=$3 WHERE id=$4 RETURNING *", [amount, category, note, id])
        res.status(200).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//delete
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM expenses WHERE id=$1", [id]);
        res.status(200).json({ message: "Expense deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//summary(Aggregation)
export const getSummary = async (req, res) => {
    try {
        const result = await pool.query("SELECT category, SUM(amount) as total FROM expenses GROUP BY category")
        res.status(200).json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}