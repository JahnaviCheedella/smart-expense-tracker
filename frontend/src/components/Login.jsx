import { 
    Button, 
    TextField, 
    Typography, 
    Link, 
    Box, 
    Card, 
    CardContent, 
    Container, 
    Avatar,
    InputAdornment
} from "@mui/material";
import { 
    LockOutlined as LockOutlinedIcon,
    Email as EmailIcon,
    VpnKey as VpnKeyIcon
} from "@mui/icons-material";
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
        <Box 
            sx={{ 
                minHeight: "100vh", 
                display: "flex", 
                alignItems: "center", 
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                py: 4
            }}
        >
            <Container maxWidth="xs">
                <Card elevation={8} sx={{ borderRadius: 4 }}>
                    <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        
                        <Typography variant="h4" component="h1" gutterBottom align="center">
                            {isRegister ? "Create Account" : "Welcome Back"}
                        </Typography>
                        
                        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 4 }}>
                            {isRegister 
                                ? "Sign up to start tracking your expenses" 
                                : "Login to access your expense dashboard"}
                        </Typography>

                        <Box component="form" noValidate sx={{ width: "100%" }}>
                            <TextField
                                margin="normal"
                                label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            <TextField
                                margin="normal"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleSubmit}
                                sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
                            >
                                {isRegister ? "Register" : "Login"}
                            </Button>

                            <Typography variant="body2" textAlign="center">
                                {isRegister ? "Already have an account? " : "Don't have an account? "}
                                <Link
                                    component="button"
                                    type="button"
                                    variant="subtitle2"
                                    onClick={() => setIsRegister(!isRegister)}
                                    sx={{ fontWeight: "bold", textDecoration: "none" }}
                                >
                                    {isRegister ? "Login here" : "Register here"}
                                </Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default Login;