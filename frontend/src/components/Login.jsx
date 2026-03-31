import { Button, TextField, Typography, Link, Box } from "@mui/material";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            if (isRegister) {
                // Register flow
                await createUserWithEmailAndPassword(auth, email, password);
                alert("User registered successfully! Please log in.");
                setIsRegister(false); // Switch back to login view after registering
            } else {
                // Login flow
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                await userCredential.user.getIdToken();
                await api.post("/users/save");

                alert("User logged in successfully");
                navigate("/mainpage");
            }
        } catch (err) {
            alert(err.response?.data?.error || err.response?.data?.message || err.message);
        }
    }

    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400} margin="0 auto" mt={5}>
            <Typography variant="h4">{isRegister ? "Register" : "Login"}</Typography>

            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Button variant="contained" onClick={handleSubmit}>
                {isRegister ? "Register" : "Login"}
            </Button>

            <Typography variant="body2" textAlign="center" mt={2}>
                {isRegister ? "Already have an account? " : "Don't have an account? "}
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Login here" : "Register here"}
                </Link>
            </Typography>
        </Box>
    )
}

export default Login;