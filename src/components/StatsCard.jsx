const scoreboardIcon = "/icons/scoreboard.svg";
const soccerIcon = "/icons/sports_soccer.svg";
const starIcon = "/icons/star.svg";
const personIcon = "/icons/person.svg";

function StatsCard({ totalMatches, totalGoals, totalAssists, activePlayers }) {
  const stats = [
    { title: "Total matches", value: totalMatches, icon: scoreboardIcon },
    { title: "Total goals", value: totalGoals, icon: soccerIcon },
    { title: "Total assists", value: totalAssists, icon: starIcon },
    { title: "Active players", value: activePlayers, icon: personIcon },
  ];

  return (
    <div className="stats-overview">
      {stats.map((stat, index) => (
        <div className="stats-card" key={stat.title ?? index}>
          <div>
            <h2>{stat.title}</h2>
            <p className="stat-value">{stat.value}</p>
          </div>
          <img src={stat.icon} alt={stat.title} />
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
