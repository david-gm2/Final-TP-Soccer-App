import {
  IconEye,
  IconDefaultUser,
  IconDelete,
} from "../../public/icons/IconsPlayer.jsx";
import "../styles/PlayersCard.css";

export function PlayerCard({ player, onView, onOpenDeleteModal }) {
  return (
    <div className="player-card">
      <div className="player-card-profile">
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
        className="btn btn-danger"
        onClick={() => onOpenDeleteModal(player)}
      >
        <IconDelete /> Delete
      </button>
    </div>
  );
}
