import "../styles/UpcomingMatches.css";

function UpcomingMatches({
  matches,
  showTitle = true,
  compact = false,
  className = "",
}) {
  const rootClass = [
    "upcoming-matches-list",
    compact ? "compact" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {showTitle && <h2>Upcoming Matches</h2>}
      {matches.slice(0, 3).map((match, index) => (
        <div className="match-card feed-card" key={index}>
          <div>
            <p>
              {match.local} vs {match.visitor}
            </p>
            <div className="match-info">
              {match.date} - {match.time}hs
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UpcomingMatches;
