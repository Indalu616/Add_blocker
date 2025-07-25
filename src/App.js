// src/App.js
import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Popup from "./PopUp";
// Create a dark theme instance
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Popup />
    </ThemeProvider>
  );
}

export default App;
