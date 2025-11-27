import { useMemo, useState } from "react";
import { usePlayers } from "../hooks/usePlayers.js";
import { useListPlayer } from "../hooks/useListPlayer.js";
import "../styles/TopPlayers.css";

function TopPlayers({
  players: propPlayers,
  showTitle = true,
  compact = false,
  className = "",
}) {
  const [isLoading, setIsLoading] = useState(false);
  useListPlayer(setIsLoading);
  const { players: ctxPlayers } = usePlayers();

  const sourcePlayers = propPlayers ?? ctxPlayers ?? [];
  const topPlayers = useMemo(() => {
    if (!Array.isArray(sourcePlayers)) return [];
    const sorted = [...sourcePlayers].sort(
      (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
    );
    return sorted.slice(0, 3).map((player, idx) => ({
      ...player,
      index: player.index ?? idx + 1,
    }));
  }, [sourcePlayers]);

  const rootClass = ["top-players", compact ? "compact" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {showTitle && <h2>Top Players</h2>}
      <div className="players-list">
        {isLoading ? (
          <p className="players-empty">Loading top players...</p>
        ) : !topPlayers.length ? (
          <p className="players-empty">No players available yet.</p>
        ) : (
          topPlayers.map((player, idx) => {
            const key =
              player.id ??
              player.player_id ??
              player.nick ??
              player.name ??
              idx;
            const indexLabel = player.index ?? idx + 1;
            return (
              <div className="players-card feed-card" key={key}>
                <div className="player-info">
                  <img
                    src="/icons/iconUserDefault.svg"
                    alt={player.nick}
                    className="player-icon"
                  />
                  <div className="player-details-card">
                    <div className="player-details-card-name">
                      <strong className="player-index"> #{indexLabel} </strong>
                      <h4> {player.nick}</h4>
                    </div>
                    <p>{player.position}</p>
                  </div>
                </div>
                <img className="arrow-icon" src="/icons/arrow.svg" alt="" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TopPlayers;
