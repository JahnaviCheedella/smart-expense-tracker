import { Grid, List, Typography, ListItem, ListItemText, IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState } from "react";
import httpCommon from "../httpCommon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Summary from "./Summary";

const fields = [
    { label: "Amount", name: "amount", type: "number", autoFocus: true },
    { label: "Category", name: "category", type: "text" },
    { label: "Note", name: "note", type: "text" }
]

const ExpenseList = ({ refresh, data }) => {
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({ id: "", amount: "", category: "", note: "" });

    const deleteExpense = async (id) => {
        await httpCommon.delete(`/${id}`);
        refresh();
    }

    const handleEditClick = (expense) => {
        setEditData(expense);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleUpdate = async () => {
        if (!editData.amount || !editData.category || !editData.note) {
            alert("Please fill in all fields.");
            return;
        }
        await httpCommon.put(`/${editData.id}`, editData);
        refresh();
        setOpen(false);
    }

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    }

    return (
        <>
            {data.length === 0 ? (
                <Typography variant="h6" align="center" mt={4} color="textSecondary">
                    No expenses found
                </Typography>
            ) : (
                <Grid container spacing={2} mt={3}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {data.length > 0 && <Typography variant="h6" fontWeight="bold" gutterBottom>Expenses</Typography>}
                    <Paper sx={{ borderTop: "1px solid #ccc", width: "100%", maxWidth: 360 }}>
                        <List>
                            {data.map((e) => (
                                <ListItem key={e.id}>
                                    <ListItemText primary={e.category} secondary={e.note + " - " + e.amount} />
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(e)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteExpense(e.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Edit Expense</DialogTitle>
                        <DialogContent>
                            {fields.map((field) => (
                                <TextField
                                    key={field.name}
                                    {...field}
                                    size="small"
                                    margin="dense"
                                    fullWidth
                                    value={editData[field.name]}
                                    onChange={handleChange}
                                />
                            ))}
                        </DialogContent>
                        <DialogActions>
                            <Button size="small" onClick={handleClose}>Cancel</Button>
                            <Button size="small" onClick={handleUpdate} variant="contained" color="primary">Update</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Summary refresh={refresh} />
                </Grid>
            </Grid>)}
        </>
    )
}

export default ExpenseList;