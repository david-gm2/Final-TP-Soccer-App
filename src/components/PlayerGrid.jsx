import { PlayerCard } from "./PlayerCard.jsx";

export function PlayerGrid({
  players,
  onView,
  onEdit,
  onOpenDeleteModal,
  isLoading,
  emptyMessage = "No players found.",
}) {
  if (isLoading) return <p className="players-empty">Loading players...</p>;

  if (!players || players.length === 0)
    return <p className="players-empty">{emptyMessage}</p>;

  return (
    <div className="player-card-container">
      {players.map((p) => (
        <PlayerCard
          key={p.id || p.player_id}
          player={p}
          onView={onView}
          onEdit={onEdit}
          onOpenDeleteModal={onOpenDeleteModal}
        />
      ))}
    </div>
  );
}
