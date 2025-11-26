import "../styles/UpcomingMatches.css";

function LatestMatches({
  matches,
  showTitle = true,
  compact = false,
  className = "",
}) {
  const rootClass = ["latest-matches-list", compact ? "compact" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {showTitle && <h2>Latest Matches</h2>}
      {matches.slice(0, 3).map((match, index) => (
        <div className="match-card feed-card" key={index}>
          <div>
            <p>
              {match.local} vs {match.visitor}
            </p>
            <div className="match-info">
              Date: {match.date} | Time: {match.time}
            </div>
          </div>
          <div className="match-actions">
            <img src="/icons/arrow.svg" alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default LatestMatches;
