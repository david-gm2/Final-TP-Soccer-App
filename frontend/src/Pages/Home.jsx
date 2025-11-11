import "../styles/home.css";

function Home() {
  let user = "user";
  let totalMatches = 5;
  let totalGoals = 44;
  let totalAssists = 13;
  let activePlayers = 20;

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

      <div className="stats-overview">
        <div className="stats-card">
          <div>
            <h2>Total Matches</h2>
            <p>{totalMatches}</p>
          </div>

          <img src="../public/icons/scoreboard.svg" alt="" />
        </div>
        <div className="stats-card">
          <div>
            <h2>Total Goals</h2>
            <p>{totalGoals}</p>
          </div>

          <img src="../public/icons/sports_soccer.svg" alt="" />
        </div>
        <div className="stats-card">
          <div>
            <h2>Total assists</h2>
            <p>{totalAssists}</p>
          </div>

          <img src="../public/icons/star.svg" alt="" />
        </div>
        <div className="stats-card">
          <div>
            <h2>Active Players</h2>
            <p>{activePlayers}</p>
          </div>

          <img src="../public/icons/person.svg" alt="" />
        </div>
      </div>

      <div className="upcoming-matches-section">
        <h2>Upcoming Matches</h2>
      </div>
    </main>
  );
}

export default Home;
