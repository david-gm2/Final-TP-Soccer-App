import { IconEye, IconDefaultUser, IconDelete } from "../icons/IconsPlayer.jsx";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/PlayersCard.css";

export function PlayerCard({ player, onView, onEdit, onOpenDeleteModal }) {
  const positionLabel = player.position || "Unknown position";
  const jerseyNumber =
    player.number !== undefined && player.number !== null
      ? ` #${player.number}`
      : "";

  const { isAdmin } = useAuth();

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
              {positionLabel}
              {jerseyNumber}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn-icon"
          onClick={() => onView(player)}
          aria-label="View player"
        >
          <IconEye />
        </button>
      </div>

      {player.bio && <p>{player.bio}</p>}
      {isAdmin && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onOpenDeleteModal(player)}
        >
          <IconDelete /> Delete
        </button>
      )}
    </div>
  );
}

export default PlayerCard;
