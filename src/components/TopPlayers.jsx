import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayers } from "../hooks/usePlayers.js";
import { useListPlayer } from "../hooks/useListPlayer.js";
import { IconDefaultUser } from "../icons/IconsPlayer.jsx";
import "../styles/TopPlayers.css";

function TopPlayers({ players: propPlayers }) {
  const [isLoading, setIsLoading] = useState(false);
  useListPlayer(setIsLoading);
  const { players: ctxPlayers } = usePlayers();
  const navigate = useNavigate();

  const topPlayers = useMemo(() => {
    const sourcePlayers = propPlayers ?? ctxPlayers ?? [];
    if (!Array.isArray(sourcePlayers)) return [];
    const sorted = [...sourcePlayers].sort(
      (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
    );
    return sorted.slice(0, 3).map((player, idx) => ({
      ...player,
      index: player.index ?? idx + 1,
    }));
  }, [ctxPlayers, propPlayers]);

  return (
    <div className="top-players">
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
            const playerId = player.player_id ?? player.id;
            const canNavigate = Boolean(playerId);
            const goToPlayerProfile = () => {
              if (!canNavigate) return;
              navigate(`/players/id/${playerId}`, { state: { player } });
            };
            return (
              <div
                className="players-card feed-card"
                key={key}
                role={canNavigate ? "button" : undefined}
                tabIndex={canNavigate ? 0 : -1}
                onClick={goToPlayerProfile}
                onKeyDown={(event) => {
                  if (!canNavigate) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    goToPlayerProfile();
                  }
                }}
              >
                <div className="player-info">
                  <IconDefaultUser
                    className="player-avatar"
                    role="img"
                    aria-label={player.nick ?? "Jugador"}
                    fill="black"
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
