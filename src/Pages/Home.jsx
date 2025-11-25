import "../styles/home.css";
import HighlightsList from "../components/HighlightsList.jsx";
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
  let user = "user";
  let totalMatches = 5;
  let totalGoals = 44;
  let totalAssists = 13;
  let activePlayers = 20;
  let upcomingMatches = [
    { local: "Team A", visitor: "Team C", date: "2023/10/01", time: "15:00" },
    { local: "Team B", visitor: "Team D", date: "2023/10/02", time: "17:00" },
    { local: "Team E", visitor: "Team F", date: "2023/10/03", time: "19:00" },
    { local: "Team G", visitor: "Team H", date: "2023/10/04", time: "16:00" },
  ];
  let topPlayers = [
    { name: "Player 1", position: "Forward", img: true },
    { name: "Player 2", position: "Midfielder", img: true },
    { name: "Player 3", position: "Defender", img: true },
    { name: "Player 4", position: "Goalkeeper", img: false },
  ];
  let latestMatches = [
    { local: "Team Z", visitor: "Team Y", date: "2023-09-20", time: "18:00" },
    { local: "Team X", visitor: "Team W", date: "2023-09-18", time: "20:00" },
    { local: "Team V", visitor: "Team U", date: "2023-09-15", time: "21:00" },
  ];

  return (
    <>
      <Header />

      <main className="home-page">
        <StatsCard {...summaryStats} />

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
                  <UpcomingMatches
                    matches={upcomingMatches}
                    showTitle={false}
                    compact
                  />
                ),
              },
              {
                key: "topPlayers",
                title: "Top Players",
                content: (
                  <TopPlayers players={topPlayers} showTitle={false} compact />
                ),
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
