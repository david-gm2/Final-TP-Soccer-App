import { Component } from "react";
import { Radar } from "react-chartjs-2";
import StatsCard from "../components/StatsCard.jsx";

export function StatsPage({ player }) {
  const scoreboardIcon = "../public/icons/scoreboard.svg";
  const soccerIcon = "../public/icons/sports_soccer.svg";
  const starIcon = "../public/icons/star.svg";
  const personIcon = "../public/icons/person.svg";
  const stats = [
    { title: "Total Matches", value: 2, icon: scoreboardIcon },
    { title: "Total Goals", value: 44, icon: soccerIcon },
    { title: "Total Assists", value: 13, icon: starIcon },
    { title: "Active Players", value: 20, icon: personIcon },
  ];
  if (!player) {
    return <main>Seleccioná un jugador para ver las estadísticas.</main>;
  }

  const data = {
    labels: [
      "Velocidad",
      "Fuerza",
      "Pases",
      "Defensa",
      "Tiro",
      "Resistencia",
      "Azul",
    ],
    datasets: [
      {
        label: `Estadísticas de ${player.nick}`,
        data: [
          player.speed,
          player.strength,
          player.passing,
          player.defense,
          player.shooting,
          player.stamina,
          player.azul,
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
      title: { display: true, text: `Perfil de ${player.nick}` },
    },
  };

  return (
    <div>
      <StatsCard stats={stats} />
      <main style={{ width: "400px", height: "400px" }}>
        <Radar data={data} options={options} />
      </main>
    </div>
  );
}

export default StatsPage;
