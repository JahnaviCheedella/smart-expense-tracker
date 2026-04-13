import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Container
} from "@mui/material";
import {
    AccountBalanceWallet as WalletIcon,
    ExitToApp as LogoutIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signOut();
        alert("User logged out successfully");
        navigate("/");
    }

    return (
        <AppBar position="sticky" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper", color: "text.primary" }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <WalletIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 800,
                            letterSpacing: ".1rem",
                            cursor: "pointer",
                            background: "linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                        onClick={() => navigate("/mainpage")}
                    >
                        EXPENSE TRACKER
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            startIcon={<LogoutIcon />}
                            sx={{
                                borderRadius: 2,
                                fontWeight: 700,
                                "&:hover": { bgcolor: "error.lighter", color: "error.main" }
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;
