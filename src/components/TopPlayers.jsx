import "../styles/TopPlayers.css";

function TopPlayers({
  players,
  showTitle = true,
  compact = false,
  className = "",
}) {
  const rootClass = ["top-players", compact ? "compact" : "", className]
    .filter(Boolean)
    .join(" ");

  const arrowIcon = "/icons/arrow.svg";

  return (
    <div className={rootClass}>
      {showTitle && <h2>Top Players</h2>}
      <div className="players-list">
        {players.slice(0, 3).map((player) => (
          <div className="players-card feed-card" key={player.id}>
            <div className="player-info">
              <img src="../public/icons/Player1.svg" alt={player.nick} />
              <div className="player-details">
                <p className="player-index"> {player.index}# </p>
                <h3> {player.nick}</h3>
                <p>{player.position}</p>
              </div>
              <img className="arrow-icon" src={arrowIcon} alt="See profile" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopPlayers;
