import {
  IconEye,
  IconDefaultUser,
  IconDelete,
} from "../../public/icons/IconsPlayer.jsx";

export function PlayerCard({ player, onView, onDelete }) {
  return (
    <div className="player-card">
      <div className="player-card-profile">
        {player.img ? (
          <img src={player.img} alt={player.name} className="player-avatar" />
        ) : (
          <IconDefaultUser width="40" height="40" />
        )}
        <div className="player-card-profile-text">
          <h4>{player.name}</h4>
          <p>
            {player.position} ● #{player.number}
          </p>
        </div>
        <button
          type="button"
          className="button-view"
          onClick={() => onView(player)}
        >
          <IconEye />
        </button>
      </div>

      {player.bio && <p>{player.bio}</p>}

      <button
        type="button"
        onClick={() => onDelete(player.id)}
        className="player-card-button"
      >
        <IconDelete /> Delete
      </button>
    </div>
  );
}
