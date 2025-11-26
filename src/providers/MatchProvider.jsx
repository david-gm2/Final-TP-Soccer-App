import { useEffect, useMemo, useState } from "react";
import { MatchContext } from "../context/MatchContext.js";

const CACHE_KEY = "matches-cache";

export function MatchProvider({ children }) {
  const [matches, setMatches] = useState(() => {
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
        data: matches,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.warn("MatchProvider: unable to write cache", err);
    }
  }, [matches, lastFetched]);

  const value = useMemo(
    () => ({ matches, setMatches, lastFetched, setLastFetched }),
    [matches, lastFetched]
  );

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
}
