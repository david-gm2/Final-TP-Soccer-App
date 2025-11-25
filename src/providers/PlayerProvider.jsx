import { useState, useMemo, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext.js";

const CACHE_KEY = "players-cache";

export function PlayerProvider({ children }) {
  const [players, setPlayers] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return [];
      const parsed = JSON.parse(cached);
      return Array.isArray(parsed?.data) ? parsed.data : [];
    } catch {
      return [];
    }
  });
  const [lastFetched, setLastFetched] = useState(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const parsed = JSON.parse(cached);
      return typeof parsed?.timestamp === "number" ? parsed.timestamp : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      const payload = {
        timestamp: lastFetched ?? Date.now(),
        data: players,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("PlayerProvider: unable to write cache", err);
    }
  }, [players, lastFetched]);

  const value = useMemo(
    () => ({ players, setPlayers, lastFetched, setLastFetched }),
    [players, lastFetched]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}
