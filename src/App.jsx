import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Home from "./Pages/Home.jsx";
import PageMatches from "./Pages/PageMatches.jsx";
import PagePlayers from "./Pages/PagePlayers.jsx";
import PagePlayerDetails from "./Pages/PagePlayerDetails.jsx";
import PageStats from "./Pages/PageStats.jsx";
import PageHistory from "./Pages/PageHistory.jsx";
import PageSignUp from "./Pages/PageSignUp.jsx";
import { LogInPage } from "./Pages/LogInPage.jsx";
import NotFoundPage from "./Pages/PageNotFound.jsx";

import "./App.css";
import "./styles/button.css";

const fallbackPlayer = {
  name: "Lautaro Martinez",
  nick: "LM10",
  speed: 85,
  strength: 75,
  passing: 70,
  defense: 60,
  shooting: 90,
  stamina: 80,
  creativity: 50,
};

function Users() {
  return (
    <>
      <Header />
      <main>
        <p>User list will be available soon for ADMINS.</p>
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<PageSignUp />} />
      <Route path="/login" element={<LogInPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path="players" element={<PagePlayers />} />
          <Route path="players/id/:id" element={<PagePlayerDetails />} />
          <Route path="stats" element={<PageStats player={fallbackPlayer} />} />
          <Route path="history" element={<PageHistory />} />
          <Route path="matches" element={<PageMatches />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
