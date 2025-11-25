import "../styles/TopPlayers.css";

const defaultPlayerIcon = "/icons/Player1.svg";
const arrowIcon = "/icons/arrow.svg";

function TopPlayers({ players = [] }) {
  return (
    <div className="top-players">
      <h2>Top Players</h2>
      <div className="players-list">
        {players.slice(0, 3).map((player, index) => {
          const key = player.id ?? player.player_id ?? index;
          const positionLabel = player.position || "Unknown role";
          const displayName = player.nick || player.name || "Unnamed player";
          return (
            <div className="players-card" key={key}>
              <div className="player-info">
                <img
                  src={player.img || defaultPlayerIcon}
                  alt={`${displayName} avatar`}
                />
                <div className="player-details-home">
                  <p className="player-index">#{index + 1}</p>
                  <h3>{displayName}</h3>
                  <p>{positionLabel}</p>
                </div>
              </div>
              <img className="arrow-icon" src={arrowIcon} alt="See profile" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopPlayers;
