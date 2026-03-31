import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes)
app.use("/api/expenses", expenseRoutes)


const PORT = process.env.SERVER_PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})