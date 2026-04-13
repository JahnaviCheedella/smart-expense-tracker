import { useState } from "react";
import { 
    TextField, 
    Button, 
    Card, 
    CardContent, 
    Typography, 
    Stack,
    InputAdornment
} from "@mui/material";
import { 
    FilterAlt as FilterIcon, 
    FilterAltOff as ClearIcon,
    Search as SearchIcon,
    DateRange as DateIcon
} from "@mui/icons-material";

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
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" fontWeight="700" gutterBottom>
          Filters
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
                label="Search Category"
                name="category"
                size="small"
                value={filters.category}
                onChange={handleFilterChange}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            
            <TextField
                label="Start Date"
                name="start"
                type="date"
                size="small"
                value={filters.start}
                onChange={handleFilterChange}
                slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <DateIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <TextField
                label="End Date"
                name="end"
                type="date"
                size="small"
                value={filters.end}
                onChange={handleFilterChange}
                slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <DateIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<FilterIcon />}
                    onClick={handleApply}
                >
                    Apply
                </Button>
                <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<ClearIcon />}
                    onClick={handleClear}
                >
                    Clear
                </Button>
            </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExpenseFilter;

