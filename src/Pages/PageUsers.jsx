import Header from "../components/Header.jsx";
import { useListPlayer } from "../hooks/useListPlayer.js";
import { useState } from "react";
import { usePlayers } from "../hooks/usePlayers.js";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";

function PageUsers() {
  const [isLoading, setIsLoading] = useState(false);

  const updatePlayer = async (playerId, updates) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BACKEND_URL}/players/${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update player: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating player:", error);
      alert("Error updating player. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useListPlayer(setIsLoading);
  const { players, setPlayers, setLastFetched } = usePlayers();
  console.log(players);
  return (
    <>
      <Header />
      <main>
        <p>User list will be available soon for ADMINS.</p>
      </main>
    </>
  );
}

export default PageUsers;
