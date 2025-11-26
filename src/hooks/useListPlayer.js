import { useEffect } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS";
import { usePlayers } from "./usePlayers.js";
import { useAuth } from "../hooks/useAuth.js";
import { authFetch } from "../utils/authFetch.js";

const CACHE_KEY = "players-cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function useListPlayer(setIsLoading) {
  const { players, setPlayers, lastFetched, setLastFetched } = usePlayers();
  const { accessToken } = useAuth();

  useEffect(() => {
    let mounted = true;

    const readCache = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        if (!Array.isArray(parsed?.data)) return null;
        return parsed;
      } catch (err) {
        console.warn("useListPlayer: unable to parse cache", err);
        return null;
      }
    };

    const cached = readCache();
    if (cached && Array.isArray(cached.data) && !players.length) {
      setPlayers(cached.data);
    }

    const shouldFetch =
      !cached ||
      !cached.timestamp ||
      Date.now() - cached.timestamp > CACHE_TTL_MS ||
      !cached.data?.length;

    const fetchPlayers = async () => {
      if (typeof setIsLoading === "function") setIsLoading(true);
      try {
        const res = await authFetch(
          `${API_BACKEND_URL}/players`,
          undefined,
          accessToken
        );
        if (!res.ok) throw new Error(`Failed to fetch players: ${res.status}`);
        const data = await res.json();
        if (mounted && typeof setPlayers === "function") {
          setPlayers(data);
          if (typeof setLastFetched === "function") setLastFetched(Date.now());
        }
      } catch (err) {
        console.error("useListPlayer: Error fetching players:", err);
      } finally {
        if (typeof setIsLoading === "function") setIsLoading(false);
      }
    };

    if (shouldFetch) {
      fetchPlayers();
    }

    return () => {
      mounted = false;
    };
  }, [
    players.length,
    setPlayers,
    setIsLoading,
    setLastFetched,
    lastFetched,
    accessToken,
  ]);

  return players;
}
