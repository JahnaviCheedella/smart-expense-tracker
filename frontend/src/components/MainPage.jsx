import { Container, Grid, Typography, Box } from "@mui/material";
import ExpenseForm from "./ExpenseForm";
import ExpenseFilter from "./ExpenseFilter";
import { useState, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import Summary from "./Summary";
import api from "../api";

const MainPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [activeFilters, setActiveFilters] = useState({ category: "", start: "", end: "" });

    const fetchData = async (filters) => {
        const params = {};
        if (filters?.category) params.category = filters.category;
        if (filters?.start) params.start = filters.start;
        if (filters?.end) params.end = filters.end;

        try {
            const res = await api.get("/expenses", { params });
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData(activeFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFilter = (filters) => {
        setActiveFilters(filters);
        fetchData(filters);
    }

    const refresh = () => {
        fetchData(activeFilters);
    }

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "calc(100vh - 64px)", py: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Header Section */}
                    <Grid size={12}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h4" fontWeight="800">Dashboard</Typography>
                            <Typography variant="body1" color="text.secondary">Manage and track your spending habits</Typography>
                        </Box>
                    </Grid>

                    {/* Summary Section */}
                    <Grid size={12}>
                        <Summary refresh={refresh} />
                    </Grid>

                    {/* Main Content Area */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <ExpenseForm refresh={refresh} />
                            <ExpenseFilter onFilter={handleFilter} />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <ExpenseList refresh={refresh} data={expenses} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default MainPage;
