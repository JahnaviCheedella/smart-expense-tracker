import { useState } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";

const filterFields = [
  { name: "category", label: "Category", type: "text" },
  {
    name: "start",
    label: "Start Date",
    type: "date",
    InputLabelProps: { shrink: true },
  },
  {
    name: "end",
    label: "End Date",
    type: "date",
    InputLabelProps: { shrink: true },
  },
];

const ExpenseFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({ category: "", start: "", end: "" });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    const resetFilters = { category: "", start: "", end: "" };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        {filterFields.map((field) => (
          <Grid key={field.name}>
            <TextField
              {...field}
              size="small"
              value={filters[field.name]}
              onChange={handleFilterChange}
            />
          </Grid>
        ))}
        <Grid>
          <Button variant="contained" onClick={handleApply}>
            Filter
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseFilter;
