import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/expenses",
    headers: {
        "Content-Type": "application/json"
    }
})