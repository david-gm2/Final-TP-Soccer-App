import { useEffect } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { usePlayerContext } from "../context/PlayerContext.jsx";

export function useListPlayer() {
  const { players, setPlayers } = usePlayerContext();

  useEffect(() => {
    fetch(`${API_BACKEND_URL}/players`)
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error fetching players:", error));
  }, []);

  return players;
}
