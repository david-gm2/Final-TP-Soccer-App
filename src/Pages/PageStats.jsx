import { Radar } from "react-chartjs-2";

export function StatsPage({ player }) {
  if (!player) {
    return <main>Seleccioná un jugador para ver las estadísticas.</main>;
  }

  const data = {
    labels: ["Velocidad", "Fuerza", "Pases", "Defensa", "Tiro", "Resistencia", 'Azul'],
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
    <main style={{ width: "400px", height: "400px" }}>
      <Radar data={data} options={options} />
    </main>
  );
}

export default StatsPage;