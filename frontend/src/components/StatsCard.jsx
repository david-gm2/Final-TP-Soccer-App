import React from "react";

const StatsCard = ({
  totalMatches,
  totalGoals,
  totalAssists,
  activePlayers,
}) => {
  const scoreboardIcon = "../public/icons/scoreboard.svg";
  const soccerIcon = "../public/icons/sports_soccer.svg";
  const starIcon = "../public/icons/star.svg";
  const personIcon = "../public/icons/person.svg";
  const stats = [
    { title: "Total Matches", value: totalMatches, icon: scoreboardIcon },
    { title: "Total Goals", value: totalGoals, icon: soccerIcon },
    { title: "Total Assists", value: totalAssists, icon: starIcon },
    { title: "Active Players", value: activePlayers, icon: personIcon },
  ];

  return (
    <div className="stats-overview">
      {stats.map((stat, index) => (
        <div className="stats-card" key={index}>
          <div>
            <h2>{stat.title}</h2>
            <p>{stat.value}</p>
          </div>
          <img src={stat.icon} alt={stat.title} />
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
