import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        primary: {
            main: "#1565C0",
        },

        secondary: {
            main: "#00ACC1",
        },

        success: {
            main: "#2E7D32",
        },

        error: {
            main: "#D32F2F",
        },

        warning: {
            main: "#ED6C02",
        },

        background: {

            default: "#F5F7FA",

            paper: "#FFFFFF",

        },

    },

    typography: {

        fontFamily: [
            "Inter",
            "Roboto",
            "Arial",
            "sans-serif",
        ].join(","),

        h4: {

            fontWeight: 700,

        },

        h5: {

            fontWeight: 600,

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

        MuiPaper: {

            styleOverrides: {

                root: {

                    borderRadius: 16,

                    boxShadow:
                        "0 4px 20px rgba(0,0,0,0.08)",

                },

            },

        },

        MuiButton: {

            styleOverrides: {

                root: {

                    borderRadius: 10,

                    padding: "10px 20px",

                },

            },

        },

        MuiTextField: {

            defaultProps: {

                variant: "outlined",

                fullWidth: true,

            },

        },

        MuiCard: {

            styleOverrides: {

                root: {

                    borderRadius: 16,

                    boxShadow:
                        "0 4px 20px rgba(0,0,0,0.08)",

                },

            },

        },

    },

});

export default theme;