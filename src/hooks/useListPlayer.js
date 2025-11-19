import { useEffect } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS";
import { usePlayers } from "./usePlayers.js";

export function useListPlayer(setIsLoading) {
  const { players, setPlayers } = usePlayers();

  useEffect(() => {
    let mounted = true;

    const fetchPlayers = async () => {
      if (typeof setIsLoading === "function") setIsLoading(true);
      try {
        const res = await fetch(`${API_BACKEND_URL}/players`);
        if (!res.ok) throw new Error(`Failed to fetch players: ${res.status}`);
        const data = await res.json();
        if (mounted && typeof setPlayers === "function") setPlayers(data);
      } catch (err) {
        console.error("useListPlayer: Error fetching players:", err);
      } finally {
        if (typeof setIsLoading === "function") setIsLoading(false);
      }
    };

    fetchPlayers();

    return () => {
      mounted = false;
    };
  }, [setPlayers, setIsLoading]);

  return players;
}
