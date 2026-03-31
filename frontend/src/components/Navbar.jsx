import { AppBar, Button, Toolbar, Typography } from "@mui/material";
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
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={() => navigate("/mainpage")}>Expense Tracker</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;