import { createContext, useState, useContext } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState([]);

  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}
