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
        ...(mode === "dark"
          ? {
              background: {
                default: "#0a0a0a",
                paper: "#111113",
              },
              text: {
                primary: "#fafafa",
                secondary: "#a1a1aa",
              },
              primary: { main: "#6366f1" }, // Indigo tint like shadcn
              divider: "rgba(255,255,255,0.08)",
            }
          : {
              background: {
                default: "#d9d9d9ff",
                paper: "#ffffff",
              },
              text: {
                primary: "#111",
                secondary: "#444",
              },
              primary: { main: "#2563eb" }, // blue-600
              divider: "rgba(0,0,0,0.08)",
            }),
      },
      shape: { borderRadius: 12 },
      typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
              borderRadius: 16,
              transition: "background-color 0.3s ease, color 0.3s ease",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            },
          },
        },
      },
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
