import { Container, Divider, Typography } from "@mui/material";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFilter from "./components/ExpenseFilter";
import { useState, useEffect } from "react";
import httpCommon from "./httpCommon";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ category: "", start: "", end: "" });

  const fetchData = async (filters) => {
    const params = {};
    if (filters?.category) params.category = filters.category;
    if (filters?.start) params.start = filters.start;
    if (filters?.end) params.end = filters.end;

    try {
      const res = await httpCommon.get("/", { params });
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
    <Container>
      <Typography variant="h4" align="center" fontWeight="bold" p={2} gutterBottom>Expense Tracker</Typography>


      <ExpenseForm refresh={refresh} />
      <Divider sx={{ my: 2, borderColor: "#000" }} />
      <ExpenseFilter onFilter={handleFilter} />
      <ExpenseList refresh={refresh} data={expenses} />
    </Container>
  )
}

export default App;