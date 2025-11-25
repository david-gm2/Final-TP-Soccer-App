import "../styles/UpcomingMatches.css";

const eyeIcon = "/icons/icon-eye.svg";
const penIcon = "/icons/icon-pen.svg";

function UpcomingMatches({ matches = [] }) {
  return (
    <div className="upcoming-matches-list">
      <h2>Upcoming Matches</h2>
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
              <img src={eyeIcon} alt="See match" />
              <img src={penIcon} alt="Edit match" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UpcomingMatches;
