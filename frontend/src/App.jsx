import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import SignUp from "./Pages/PageSignUp.jsx";
import NotFoundPage from "./Pages/PageNotFound.jsx";
import StatsPage from "./Pages/PageStats.jsx";
import Home from "./Pages/Home.jsx";
import MatchesPage from "./Pages/PageMatches.jsx";
import PlayersPage from "./Pages/PagePlayers.jsx";
import HistoryPage from "./Pages/PageHistory.jsx";
import LogIn from "./Pages/PageLogIn.jsx";
import "./App.css";

const dummyPlayer = {
  name: "Martínez",
  speed: 85,
  strength: 75,
  passing: 70,
  defense: 60,
  shooting: 90,
  stamina: 80,
  azul: 50,
};

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<LogIn />} />

      <Route path="/" element={<Sidebar />}>
        <Route index element={<Home />} />
        <Route path="stats" element={<StatsPage player={dummyPlayer} />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="players/:id" element={<PlayersPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
