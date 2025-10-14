import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

function Root() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    // Persist user preference
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#bebebeff", paper: "#989898ff" },
                primary: { main: "#0b5db0ff" },
                text: { primary: "#1e1e1e" },
              }
            : {
                background: { default: "#0a0a0a", paper: "#161616" },
                primary: { main: "#0b62a9ff" },
                text: { primary: "#ffffff" },
              }),
        },
        typography: {
          fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        },
        shape: { borderRadius: 10 },
      }),
    [mode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App toggleTheme={toggleTheme} mode={mode} />
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
