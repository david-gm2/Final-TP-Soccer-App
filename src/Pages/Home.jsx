import "../styles/home.css";

import Header from "../components/Header.jsx";
import LatestMatches from "../components/LatestMatches.jsx";
import UpcomingMatches from "../components/UpcomingMatches.jsx";
import TopPlayers from "../components/TopPlayers.jsx";
import StatsCard from "../components/StatsCard.jsx";

const summaryStats = {
  totalMatches: 5,
  totalGoals: 44,
  totalAssists: 13,
  activePlayers: 20,
};

const sampleMatches = [
  {
    id: 1,
    homeTeam: "Team A",
    awayTeam: "Team C",
    date: "2023-10-01",
    time: "15:00",
  },
  {
    id: 2,
    homeTeam: "Team B",
    awayTeam: "Team D",
    date: "2023-10-02",
    time: "17:00",
  },
  {
    id: 3,
    homeTeam: "Team E",
    awayTeam: "Team F",
    date: "2023-10-03",
    time: "19:00",
  },
  {
    id: 4,
    homeTeam: "Team G",
    awayTeam: "Team H",
    date: "2023-10-04",
    time: "16:00",
  },
];

const samplePlayers = [
  { id: 1, nick: "Player 1", position: "Forward" },
  { id: 2, nick: "Player 2", position: "Midfielder" },
  { id: 3, nick: "Player 3", position: "Defender" },
  { id: 4, nick: "Player 4", position: "Goalkeeper" },
];

function Home() {
  return (
    <>
      <Header />

      <main className="home-page">
        <StatsCard {...summaryStats} />

        <div className="cards-overview">
          <div className="cards-upcoming-matches">
            <div className="cards-section">
              <UpcomingMatches matches={sampleMatches} />
            </div>
          </div>
          <div className="cards-top-players">
            <div className="cards-section">
              <TopPlayers players={samplePlayers} />
            </div>
          </div>
        </div>

        <div className="latest-matches-section">
          <div className="cards-section">
            <LatestMatches matches={sampleMatches} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
