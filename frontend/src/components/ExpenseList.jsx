import {
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Stack,
  Chip
} from "@mui/material";
import { useState } from "react";
import api from "../api";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon
} from "@mui/icons-material";

const fields = [
  { label: "Amount", name: "amount", type: "number", autoFocus: true },
  { label: "Category", name: "category", type: "text" },
  { label: "Note", name: "note", type: "text" },
];

const ExpenseList = ({ refresh, data }) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    amount: "",
    category: "",
    note: "",
  });

  const deleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await api.delete(`/expenses/${id}`);
      refresh();
    }
  };

  const handleEditClick = (expense) => {
    setEditData(expense);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    if (!editData.amount || !editData.category || !editData.note) {
      alert("Please fill in all fields.");
      return;
    }
    await api.put(`/expenses/${editData.id}`, editData);
    refresh();
    setOpen(false);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
        Recent Expenses
        <Chip label={data.length} size="small" color="primary" variant="outlined" />
      </Typography>

      {data.length === 0 ? (
        <Card sx={{ p: 4, textAlign: "center", bgcolor: "background.paper", border: "1px dashed", borderColor: "divider" }}>
          <Typography color="textSecondary">No expenses found matching your criteria.</Typography>
        </Card>
      ) : (
        <Stack spacing={2}>
          {data.map((e) => (
            <Card key={e.id} variant="outlined" sx={{ transition: "0.2s", "&:hover": { boxShadow: 3, borderColor: "primary.light" } }}>
              <CardContent sx={{ py: "16px !important" }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: "primary.lighter", color: "primary.main" }}>
                        <CategoryIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="700">{e.category}</Typography>
                        <Typography variant="body2" color="textSecondary">{e.note}</Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                      <CalendarIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption">{formatDate(e.created_at)}</Typography>
                    </Box>
                    <Typography variant="h6" color="primary.main" fontWeight="800">
                      ${Number(e.amount).toLocaleString()}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 3 }} sx={{ textAlign: "right" }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditClick(e)} sx={{ mr: 1 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => deleteExpense(e.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Edit Expense</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            {fields.map((field) => (
              <TextField
                key={field.name}
                {...field}
                label={field.label}
                value={editData[field.name]}
                onChange={handleChange}
                fullWidth
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" sx={{ px: 4 }}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Internal Avatar placeholder since I didn't import it
const Avatar = ({ children, sx }) => (
  <Box sx={{
    width: 40,
    height: 40,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...sx
  }}>
    {children}
  </Box>
);

export default ExpenseList;

