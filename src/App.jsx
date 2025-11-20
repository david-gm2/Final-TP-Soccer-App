import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import SignUp from "./Pages/PageSignUp.jsx";
import NotFoundPage from "./Pages/PageNotFound.jsx";
import StatsPage from "./Pages/PageStats.jsx";
import Home from "./Pages/Home.jsx";
import PageMatches from "./Pages/PageMatches.jsx";
import PlayersPage from "./Pages/PagePlayers.jsx";
import PagePlayerDetails from "./Pages/PagePlayerDetails.jsx";
import HistoryPage from "./Pages/PageHistory.jsx";
import LogIn from "./Pages/PageLogIn.jsx";
import "./App.css";
import Header from "./components/Header.jsx";

import "./styles/button.css";

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
      {/* Rutas públicas */}
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/log-in" element={<LogIn />} />

      {/* Rutas con Sidebar */}
      <Route path="/" element={<Sidebar />}>
        {/* Páginas con su propio header */}
        <Route path="players" element={<PlayersPage />} />
        <Route path="players/id/:id" element={<PagePlayerDetails />} />

        {/* Layout con header general */}
        <Route index element={<Home />} />
        <Route element={<Header />}>
          <Route path="stats" element={<StatsPage player={dummyPlayer} />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="matches" element={<PageMatches />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
