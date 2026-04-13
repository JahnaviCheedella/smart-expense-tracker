import { 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Box, 
    Avatar,
    Divider
} from "@mui/material";
import { 
    AccountBalance as TotalIcon,
    ShoppingCart as ShopIcon,
    Restaurant as EatIcon,
    Home as HomeIcon,
    Category as MiscIcon
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import api from "../api";

const getIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("food") || cat.includes("eat")) return <EatIcon />;
    if (cat.includes("shop")) return <ShopIcon />;
    if (cat.includes("rent") || cat.includes("home")) return <HomeIcon />;
    return <MiscIcon />;
}

const getColor = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("food")) return "#ff9800"; // Orange
    if (cat.includes("shop")) return "#e91e63"; // Pink
    if (cat.includes("rent")) return "#4caf50"; // Green
    return "#3f51b5"; // Indigo
}

const Summary = ({ refresh }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await api.get("/expenses/summary");
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSummary();
    }, [refresh])

    const totalSpent = data.reduce((acc, curr) => acc + Number(curr.total), 0);

    return (
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <Card sx={{ bgcolor: "primary.main", color: "white", height: "100%" }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography variant="overline" sx={{ opacity: 0.8, fontWeight: 700 }}>Total Spent</Typography>
                                    <Typography variant="h4" fontWeight="800">${totalSpent.toLocaleString()}</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 48, height: 48 }}>
                                    <TotalIcon />
                                </Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {data.map((item) => (
                    <Grid size={{xs: 12, sm: 6, md: 3}} key={item.category}>
                        <Card sx={{ height: "100%", transition: "0.3s", "&:hover": { transform: "translateY(-4px)" } }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Avatar sx={{ bgcolor: `${getColor(item.category)}15`, color: getColor(item.category) }}>
                                        {getIcon(item.category)}
                                    </Avatar>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="caption" color="textSecondary" fontWeight="700" sx={{ textTransform: "uppercase" }}>
                                            {item.category}
                                        </Typography>
                                        <Typography variant="h6" fontWeight="800">
                                            ${Number(item.total).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Divider sx={{ mt: 4, mb: 1 }} />
        </Box>
    )
}

export default Summary;
