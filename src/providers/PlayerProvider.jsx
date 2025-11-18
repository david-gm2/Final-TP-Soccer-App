import { useState, useMemo } from "react";
import { PlayerContext } from "../context/PlayerContext.js";

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([]);

  const value = useMemo(() => ({ players, setPlayers }), [players]);

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}
