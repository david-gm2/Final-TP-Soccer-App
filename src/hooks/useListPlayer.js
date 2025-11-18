import { useEffect } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS";
import { usePlayers } from "./usePlayers.js";

export function useListPlayer() {
  const { players, setPlayers } = usePlayers();

  useEffect(() => {
    fetch(`${API_BACKEND_URL}/players`)
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error fetching players:", error));
  }, [setPlayers]);

  return players;
}
