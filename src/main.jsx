import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PlayerProvider } from "./providers/PlayerProvider";

import "./index.css";
import App from "./App.jsx";
import "./chartCongif.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayerProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </PlayerProvider>
  </StrictMode>
);
