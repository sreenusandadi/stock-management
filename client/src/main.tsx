import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

import { AuthProvider } from "./context/AuthProvider.tsx";
import { NavItemsProvider } from "./context/NavItemsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <NavItemsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NavItemsProvider>
    </AuthProvider>
  </StrictMode>
);
