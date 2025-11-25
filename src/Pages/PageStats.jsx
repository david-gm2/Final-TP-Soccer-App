import { Radar } from "react-chartjs-2";
import Header from "../components/Header";

export function StatsPage({ player }) {
  if (!player) {
    return <main>Please select a player to see the stats.</main>;
  }

  const labels = [
    "Speed",
    "Strength",
    "Passing",
    "Defense",
    "Shooting",
    "Stamina",
    "Creativity",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: `${player.nick || player.name} stats`,
        data: [
          player.speed,
          player.strength,
          player.passing,
          player.defense,
          player.shooting,
          player.stamina,
          player.creativity,
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
      title: {
        display: true,
        text: `Profile for ${player.nick || player.name}`,
      },
    },
  };

  return (
    <>
      <Header />
      <main style={{ width: "400px", height: "400px" }}>
        <Radar data={data} options={options} />
      </main>
    </>
  );
}

export default StatsPage;
