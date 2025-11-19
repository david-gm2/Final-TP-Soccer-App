import { PlayerCard } from "./PlayerCard.jsx";

export function PlayerGrid({ players, onView, onOpenDeleteModal }) {
  if (!players || players.length === 0) return <p>No players found.</p>;

  return (
    <div className="player-card-container">
      {players.map((p) => (
        <PlayerCard
          key={p.id || p.player_id}
          player={p}
          onView={onView}
          onOpenDeleteModal={onOpenDeleteModal}
        />
      ))}
    </div>
  );
}
