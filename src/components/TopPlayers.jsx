import "../styles/TopPlayers.css";

function TopPlayers({ players }) {
  return (
    <div className="top-players">
      <h2>Top Players</h2>
      <div className="players-list">
        {players.slice(0, 3).map((player) => (
          <div className="players-card" key={player.id}>
            <div className="player-info">
              <img src="../public/icons/Player1.svg" alt={player.name} />
              <div className="player-details">
                <h3> {player.name}</h3>
                <p>{player.position}</p>
              </div>
            </div>
            <img
              className="arrow-icon"
              src="../public/icons/arrow.svg"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopPlayers;
