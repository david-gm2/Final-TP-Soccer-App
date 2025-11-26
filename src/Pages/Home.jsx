import "../styles/home.css";
import HighlightsList from "../components/HighlightsList.jsx";
import Header from "../components/Header.jsx";
import LatestMatches from "../components/LatestMatches.jsx";
import UpcomingMatches from "../components/UpcomingMatches.jsx";
import TopPlayers from "../components/TopPlayers.jsx";
import StatsCard from "../components/StatsCard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

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
      onClick: () =>
        navigate("/players", { state: { openCreateModal: true } }),
    },
  ];

  let totalMatches = 5;
  let totalGoals = 44;
  let totalAssists = 13;
  let activePlayers = 20;
  let latestMatches = [
    { local: "Team Z", visitor: "Team Y", date: "2023-09-20", time: "18:00" },
    { local: "Team X", visitor: "Team W", date: "2023-09-18", time: "20:00" },
    { local: "Team V", visitor: "Team U", date: "2023-09-15", time: "21:00" },
  ];

  return (
    <>
      <Header
        title={title}
        subtitle="Here's your weekly summary with the key stats and upcoming matches."
        actions={headerActions}
      />

      <main className="home-page">
        <StatsCard
          stats={[
            {
              title: "Total Matches",
              value: totalMatches,
              icon: "/icons/scoreboard.svg",
            },
            {
              title: "Total Goals",
              value: totalGoals,
              icon: "/icons/sports_soccer.svg",
            },
            {
              title: "Total Assists",
              value: totalAssists,
              icon: "/icons/star.svg",
            },
            {
              title: "Active Players",
              value: activePlayers,
              icon: "/icons/person.svg",
            },
          ]}
        />

        <div className="cards-section flat-feed">
          <HighlightsList
            sections={[
              {
                key: "upcoming",
                title: "Upcoming Matches",
                content: (
                  <UpcomingMatches showTitle={false} compact />
                ),
              },
              {
                key: "topPlayers",
                title: "Top Players",
                content: <TopPlayers showTitle={false} compact />,
              },
              {
                key: "latest",
                title: "Latest Matches",
                content: (
                  <LatestMatches
                    matches={latestMatches}
                    showTitle={false}
                    compact
                  />
                ),
              },
            ]}
          />
        </div>
      </main>
    </>
  );
}

export default Home;
