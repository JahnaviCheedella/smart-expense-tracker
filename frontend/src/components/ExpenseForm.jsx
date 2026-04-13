import { useState } from "react";
import { 
    TextField, 
    Button, 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    InputAdornment,
    Stack
} from "@mui/material";
import { 
    Add as AddIcon, 
    AttachMoney as MoneyIcon, 
    Label as LabelIcon, 
    Note as NoteIcon 
} from "@mui/icons-material";
import api from "../api";

const ExpenseForm = ({ refresh }) => {
  const [form, setForm] = useState({ amount: "", category: "", note: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.amount || !form.category || !form.note) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await api.post("/expenses", form);
      setForm({ amount: "", category: "", note: "" });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" fontWeight="700" gutterBottom>
          Add New Expense
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
                label="Amount"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <MoneyIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <TextField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Food, Rent"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <LabelIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <TextField
                label="Note"
                name="note"
                value={form.note}
                onChange={handleChange}
                multiline
                rows={2}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <NoteIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<AddIcon />}
                onClick={handleSubmit}
                sx={{ mt: 1 }}
            >
                Add Expense
            </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;

