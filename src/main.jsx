import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PlayerProvider } from "./providers/PlayerProvider";
import { AuthProvider } from "./providers/AuthProvider.jsx";

import "./index.css";
import App from "./App.jsx";
import "./chartCongif.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  </StrictMode>
);
