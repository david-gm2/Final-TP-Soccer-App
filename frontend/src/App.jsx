import Sidebar from "./components/Sidebar.jsx";
import PlayersPage from "./Pages/PlayersPage.jsx";
import { Route, Routes } from "react-router-dom";
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

export function StatsPage({ player }) {
  if (!player) {
    return <main>Seleccioná un jugador para ver las estadísticas.</main>;
  }

  const data = {
    labels: ["Velocidad", "Fuerza", "Pases", "Defensa", "Tiro", "Resistencia"],
    datasets: [
      {
        label: `Estadísticas de ${player.name}`,
        data: [
          player.speed,
          player.strength,
          player.passing,
          player.defense,
          player.shooting,
          player.stamina,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: { beginAtZero: true, min: 0, max: 100, ticks: { stepSize: 20 } },
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: `Perfil de ${player.name}` },
    },
  };

  return (
    <main style={{ width: "400px", height: "400px" }}>
      <Radar data={data} options={options} />
    </main>
  );
}

export function MatchesPage() {
  return (
    <>
      <main>
        <p>pvp</p>
        <p>pvp</p>
      </main>
    </>
  );
}

export function HistoryPage() {
  return (
    <main>
      <p>habia una vez...</p>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main>
      <h1>404 Page not found</h1>
    </main>
  );
}

function App() {
  return (
    <>
      <Sidebar />

      <Routes>
        <Route path="/stats" element={<StatsPage player={dummyPlayer} />} />;
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/players/:id" element={<PlayersPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
