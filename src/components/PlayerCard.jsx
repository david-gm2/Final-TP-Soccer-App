import {
  IconEye,
  IconDefaultUser,
  IconDelete,
} from "../../public/icons/IconsPlayer.jsx";
import "../styles/PlayersCard.css";

export function PlayerCard({ player, onView, onEdit, onOpenDeleteModal }) {
  return (
    <div
      className="player-card"
      onDoubleClick={() => onEdit?.(player)}
      role="presentation"
    >
      <div className="player-card-profile">
        <div className="player-card-profile-data">
          {player.img ? (
            <img src={player.img} alt={player.nick} className="player-avatar" />
          ) : (
            <IconDefaultUser width="40" height="40" />
          )}
          <div className="player-card-profile-text">
            <h4>{player.nick}</h4>
            <p>
              {player.position} ● #{player.number}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn-icon"
          onClick={() => onView(player)}
        >
          <IconEye />
        </button>
      </div>

      {player.bio && <p>{player.bio}</p>}

      <button
        className="btn btn-secondary"
        onClick={() => onOpenDeleteModal(player)}
      >
        <IconDelete /> Delete
      </button>
    </div>
  );
}
