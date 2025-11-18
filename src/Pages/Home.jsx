import "../styles/home.css";
import LatestMatches from "../components/LatestMatches.jsx";
import UpcomingMatches from "../components/UpcomingMatches.jsx";
import TopPlayers from "../components/TopPlayers.jsx";
import StatsCard from "../components/StatsCard.jsx";

function Home() {
  let user = "user";
  const stats = [
    {
      title: "Total Matches",
      value: 5,
      icon: "../public/icons/scoreboard.svg",
    },
    {
      title: "Total Goals",
      value: 44,
      icon: "../public/icons/sports_soccer.svg",
    },
    {
      title: "Total Assists",
      value: 13,
      icon: "../public/icons/star.svg",
    },
    {
      title: "Active Players",
      value: 20,
      icon: "../public/icons/users.svg",
    },
  ];

  let upcomingMatches = [
    { local: "Team A", visitor: "Team C", date: "2023-10-01", time: "15:00" },
    { local: "Team B", visitor: "Team D", date: "2023-10-02", time: "17:00" },
    { local: "Team E", visitor: "Team F", date: "2023-10-03", time: "19:00" },
    { local: "Team G", visitor: "Team H", date: "2023-10-04", time: "16:00" },
  ];
  let topPlayers = [
    { name: "Player 1", position: "Forward", img: true },
    { name: "Player 2", position: "Midfielder", img: true },
    { name: "Player 3", position: "Defender", img: true },
    { name: "Player 4", position: "Goalkeeper", img: false },
  ];

  return (
    <main className="home-page">
      <div className="welcome-section">
        <div>
          <h1>Welcome {user}! </h1>
          <p>
            Here’s your weekly summary with the key stats and upcoming matches.
          </p>
        </div>

        <div className="action-buttons">
          <button id="new-match-button">
            <img src="../public/icons/Vector.svg" alt="" /> New Match
          </button>
          <button id="add-player-button">
            <img src="../public/icons/Plus.svg" alt="" /> Add Player
          </button>
        </div>
      </div>

      <StatsCard stats={stats} />
      <div className="cards-overview">
        <div className="cards-upcoming-matches">
          <div className="cards-section">
            <UpcomingMatches matches={upcomingMatches} />
          </div>
        </div>
        <div className="cards-top-players">
          <div className="cards-section">
            <TopPlayers players={topPlayers} />
          </div>
        </div>
      </div>
      <div className="latest-matches-section">
        <div className="cards-section">
          <LatestMatches matches={upcomingMatches} />
        </div>
      </div>
    </main>
  );
}

export default Home;
