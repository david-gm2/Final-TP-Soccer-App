import "../styles/UpcomingMatches.css";

const arrowIcon = "/icons/arrow.svg";

function LatestMatches({ matches = [] }) {
  return (
    <div className="latest-matches-list">
      <h2>Latest Matches</h2>
      {matches.slice(0, 3).map((match, index) => {
        const key = match.id ?? index;
        return (
        <div className="home-match-card" key={key}>
          <div>
            <p>
              {match.homeTeam} vs {match.awayTeam}
            </p>
            <div className="home-match-info">
              Date: {match.date} | Time: {match.time}
            </div>
          </div>
          <div className="home-match-actions">
            <img src={arrowIcon} alt="View match details" />
          </div>
        </div>
        );
      })}
    </div>
  );
}

export default LatestMatches;
