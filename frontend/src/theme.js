import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3f51b5", // Indigo
            light: "#757de8",
            dark: "#002984",
            contrastText: "#fff",
        },
        secondary: {
            main: "#ffc107", // Amber
            light: "#fff350",
            dark: "#c79100",
            contrastText: "#000",
        },
        background: {
            default: "#f4f6f8",
            paper: "#ffffff",
        },
        text: {
            primary: "#263238",
            secondary: "#546e7a",
        },
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h4: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                },
                containedPrimary: {
                    background: "linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                    borderRadius: 16,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                fullWidth: true,
            },
        },
    },
});

export default theme;
