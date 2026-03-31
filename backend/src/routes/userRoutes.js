import express from "express";
import {
    // getAllUsers, getProfile,
    saveUser
} from "../controllers/userContoller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/save", verifyToken, saveUser); //save user after firebase login

export default router;