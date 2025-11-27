import "../styles/home.css";
import HighlightsList from "../components/HighlightsList.jsx";
import Header from "../components/Header.jsx";
import LatestMatches from "../components/LatestMatches.jsx";
import UpcomingMatches from "../components/UpcomingMatches.jsx";
import TopPlayers from "../components/TopPlayers.jsx";
import StatsCard from "../components/StatsCard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { useMatchesStats } from "../hooks/useMatchesStats.js";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const title = user?.userName
    ? `Welcome ${user.userName}`
    : "Welcome to Soccer App";

  const headerActions = [
    {
      text: "New match",
      className: "btn btn-primary",
      icon: "scoreboard",
      onClick: () => navigate("/matches"),
    },
    {
      text: "Add player",
      className: "btn btn-secondary",
      icon: "plus",
      onClick: () => navigate("/players", { state: { openCreateModal: true } }),
    },
  ];

  const matchesStats = useMatchesStats();

  return (
    <>
      <Header
        title={title}
        subtitle="Here's your weekly summary with the key stats and upcoming matches."
        actions={headerActions}
      />

      <main className="home-page">
        {matchesStats && (
          <StatsCard
            stats={[
              {
                title: "Total Matches",
                value: matchesStats.totalMatches,
                icon: "/icons/scoreboard.svg",
              },
              {
                title: "Total Goals",
                value: matchesStats.totalGoals,
                icon: "/icons/sports_soccer.svg",
              },
              {
                title: "Total Assists",
                value: matchesStats.totalAssists,
                icon: "/icons/star.svg",
              },
              {
                title: "Active Players",
                value: matchesStats.activePlayers,
                icon: "/icons/person.svg",
              },
            ]}
          />
        )}

        <div className="cards-section flat-feed">
          <HighlightsList
            sections={[
              {
                key: "upcoming",
                title: "Upcoming Matches",
                content: <UpcomingMatches />,
              },
              {
                key: "topPlayers",
                title: "Top Players",
                content: <TopPlayers />,
              },
              {
                key: "latest",
                title: "Latest Matches",
                content: <LatestMatches />,
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}

export default Home;
