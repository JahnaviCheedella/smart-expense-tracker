import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import httpCommon from "../httpCommon";

const fields = [
  { label: "Amount", name: "amount", type: "number" },
  { label: "Category", name: "category", type: "text" },
  { label: "Note", name: "note", type: "text" },
];

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
      await httpCommon.post("/", form);
      setForm({ amount: "", category: "", note: "" });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid sx={{ display: "flex", justifyContent: "center" }}>
      <Grid size={{ xs: 12, md: 4 }} container spacing={2}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            {...field}
            size="small"
            value={form[field.name]}
            onChange={handleChange}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Add Expense
        </Button>
      </Grid>
    </Grid>
  );
};

export default ExpenseForm;
