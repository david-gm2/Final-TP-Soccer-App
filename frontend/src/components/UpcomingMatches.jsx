import "../styles/upcomingMatches.css";

function UpcomingMatches({ matches }) {
  return (
    <div className="upcoming-matches-list">
      {matches.map((match, index) => (
        <div className="match-card" key={index}>
          <div>
            <p>
              {match.local} vs {match.visitor}
            </p>
            <div className="match-info">
              Date: {match.date} | Time: {match.time}
            </div>
          </div>
          <div className="match-actions">
            <img src="../icons/icon-eye.svg" alt="" />
            <img src="../icons/icon-pen.svg" alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default UpcomingMatches;
