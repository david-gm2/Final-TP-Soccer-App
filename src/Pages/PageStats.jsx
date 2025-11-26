import "../styles/StatsPage.css";
import "../styles/PlayerFiltrer.css";
import "../styles/StatsCard.css";
import "../styles/ListPlayers.css";

import StatsCard from "../components/StatsCard.jsx";
import PlayerFilter from "../components/PlayerFilter.jsx";
import ListPlayers from "../components/ListPlayers.jsx";
import { useGlobalStats } from "../hooks/useGlobalStasts.js";
import Header from "../components/Header.jsx";

function StatsPage() {
  const stats = useGlobalStats();

  return (
    <>
      <Header title="Statistics" subtitle="Player rankings and performance" />
      <div className="stats-page">
        <StatsCard stats={mapStats(stats)} />
        <PlayerFilter />
        <ListPlayers />
      </div>
    </>
  );
}

export default StatsPage;

function mapStats(stats) {
  return Object.entries(stats)
    .map(([key, value]) => {
      let title = "";
      let icon = "";
      let priority = 0;

      switch (key) {
        case "activePlayers":
          title = "Active Players";
          icon = "../public/icons/person.svg";
          priority = 1;
          break;
        case "totalGoals":
          title = "Total Goals";
          icon = "../public/icons/sports_soccer.svg";
          priority = 2;
          break;
        case "totalAssists":
          title = "Total Assists";
          icon = "../public/icons/circule.svg";
          priority = 3;
          break;
        case "averageRating":
          title = "Average Rating";
          icon = "../public/icons/star.svg";
          priority = 4;
          break;
        default:
          break;
      }

      return { title, value, icon, priority };
    })
    .sort((a, b) => a.priority - b.priority);
}
