import { createTheme } from '@mui/material/styles';

export const themeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#61256c",
      dark: "#340041",
      light: "#90519b",
    },
    secondary: {
      main: "#bc7d2a",
      light: "#f2ac58",
      dark: "#875100",
    },
  },
  shape: {
    borderRadius: "0.5rem",
  },
  typography: {
    fontFamily: "Roboto",

    button: {
      textTransform: "none",
      fontWeight: "bold",
      fontSize:"1rem"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot

        containedPrimary: {
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          padding: "0.4rem 3rem 0.4rem 3rem",
          border: "0.15rem solid #61256c",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            backgroundColor: "#ffffff",
            color: "#61256c",
            border: "0.15rem solid #61256c",
          },
        },
        containedSecondary: {
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          padding: "0.4rem 3rem 0.4rem 3rem",
          border: "0.15rem solid #BC7D2A",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            backgroundColor: "#ffffff",
            color: "#BC7D2A",
            border: "0.15rem solid #BC7D2A",
          },
        },
      },
    },
  },
};

export default createTheme(themeOptions);
