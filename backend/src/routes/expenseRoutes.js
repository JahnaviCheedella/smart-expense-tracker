import express from "express";
import { createExpense, deleteExpense, getExpenses, getSummary, updateExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", createExpense);

router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.get("/summary", getSummary);

export default router;