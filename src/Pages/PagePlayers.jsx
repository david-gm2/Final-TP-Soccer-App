import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { useURLFilters } from "../hooks/useURLFilters.js";
import { useListPlayer } from "../hooks/useListPlayer.js";
import { usePlayers } from "../hooks/usePlayers.js";

import { HeaderPlayerPage } from "../components/PlayerPageHeader.jsx";
import { PlayerFilter } from "../components/PlayerFilter.jsx";
import { PlayerGrid } from "../components/PlayerGrid.jsx";
import PlayerModal from "../components/PlayerModal.jsx";
import DeletePlayerModal from "../components/DeletePlayerModal.jsx";

import "../styles/PlayersPage.css";
import "../styles/PlayerFiltrer.css";
import "../styles/PlayerModal.css";

function PlayersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Get players from context
  const { players, setPlayers } = usePlayers();

  // Fetch players on mount
  useListPlayer();

  // Get position filters from URL
  const { active } = useURLFilters("position");

  // Filter players based on selected positions
  const filtered = useMemo(() => {
    if (!active || active.length === 0) return players;

    const useBest = active.includes("best-performance");
    const positions = active.filter(
      (f) => f !== "best-performance" && f !== "all"
    );

    return players.filter((p) => {
      const playerPos = (p.position || "").toLowerCase();
      if (positions.length && !positions.includes(playerPos)) return false;
      if (useBest && p.bestPerformance !== true) return false;
      return true;
    });
  }, [players, active]);

  const navigate = useNavigate();
  const handleView = (player) => navigate(`/players/${player.player_id}`);

  // API Functions
  const createPlayer = async (newPlayer) => {
    try {
      const response = await fetch(`${API_BACKEND_URL}/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        throw new Error(`Failed to create player: ${response.statusText}`);
      }

      const createdPlayer = await response.json();
      console.log("Player created successfully:", createdPlayer);
      return createdPlayer;
    } catch (error) {
      console.error("Error creating player:", error);
      alert("Error creating player. Please try again.");
      return null;
    }
  };

  const deletePlayer = async (playerId) => {
    try {
      const response = await fetch(`${API_BACKEND_URL}/players/${playerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete player: ${response.statusText}`);
      }

      console.log(`Player ${playerId} deleted successfully`);
      return true;
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("Error deleting player. Please try again.");
      return false;
    }
  };

  // State update handlers
  const handleAddPlayer = async (newPlayer) => {
    const createdPlayer = await createPlayer(newPlayer);
    if (createdPlayer) {
      setPlayers((prev) => [...prev, createdPlayer]);
    }
  };

  const handleRemovePlayer = async (playerId) => {
    const success = await deletePlayer(playerId);
    if (success) {
      setPlayers((prev) => prev.filter((p) => p.player_id !== playerId));
    }
  };

  // Modal handlers
  const openDeleteModal = (player) => {
    setSelectedPlayer(player);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPlayer(null);
  };

  const confirmDelete = () => {
    if (selectedPlayer) {
      handleRemovePlayer(selectedPlayer.player_id);
      closeDeleteModal();
    }
  };

  return (
    <>
      <main className="players-page">
        <HeaderPlayerPage handleToggleModal={() => setIsModalOpen((v) => !v)} />
        <PlayerFilter />

        <PlayerGrid
          players={filtered}
          onView={handleView}
          onOpenDeleteModal={openDeleteModal}
        />
      </main>

      <PlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPlayer}
      />

      <DeletePlayerModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        player={selectedPlayer}
      />
    </>
  );
}

export default PlayersPage;
