import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { PlayerProvider } from "./providers/PlayerProvider";
import { MatchProvider } from "./providers/MatchProvider";

import "./index.css";
import App from "./App.jsx";
import "./chartCongif.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayerProvider>
      <MatchProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </MatchProvider>
    </PlayerProvider>
  </StrictMode>
);
