import express from "express";
import { CreateExpense, deleteExpense, getExpenses, getSummary, updateExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", CreateExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.get("/summary", getSummary);

export default router;