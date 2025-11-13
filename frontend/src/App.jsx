
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import MatchesPage from "./pages/MatchesPage.jsx";
import PlayersPage from "./pages/PlayerPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import LogIn from "./pages/Login";

import "./App.css";

import { Radar } from "react-chartjs-2";

const dummyPlayer = {
  name: "Martínez",
  speed: 85,
  strength: 75,
  passing: 70,
  defense: 60,
  shooting: 90,
  stamina: 80,
};


function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<LogIn />} />

      <Route
        path="/"
        element={
          <div className="app-layout">
            <Sidebar />
          </div>
        }
      >
        <Route path="/stats" element={<StatsPage player={dummyPlayer} />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/players/:id" element={<PlayersPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
