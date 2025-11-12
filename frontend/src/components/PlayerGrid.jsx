import { PlayerCard } from "./PlayerCard.jsx";

export function PlayerGrid({ players, onView, onDelete }) {
  if (players.length === 0) return <p>No players found.</p>;
  return (
    <div className="player-card-container">
      {players.map((p) => (
        <PlayerCard key={p.id} player={p} onView={onView} onDelete={onDelete} />
      ))}
    </div>
  );
}
