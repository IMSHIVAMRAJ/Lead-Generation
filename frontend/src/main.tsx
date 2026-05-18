import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const THEME_STORAGE_KEY = "leadgen.theme";
const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const isDark = storedTheme ? storedTheme === "dark" : prefersDark;
document.documentElement.classList.toggle("dark", isDark);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
