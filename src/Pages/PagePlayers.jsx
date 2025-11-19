import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useURLFilters } from "../hooks/useURLFilters.js";
import { useListPlayer } from "../hooks/useListPlayer.js";
import { usePlayers } from "../hooks/usePlayers.js";

import Header from "../components/Header.jsx";
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

  // 1) players vienen del contexto
  const { players, setPlayers } = usePlayers();

  // 2) este hook hace el fetch y llena el contexto
  useListPlayer();
  const { active } = useURLFilters("position");

  const filtered = useMemo(() => {
    if (!active || active.length === 0) return players;

    const useBest = active.includes("best-performance");
    const pos = active.filter((f) => f !== "best-performance" && f !== "all");

    return players.filter((p) => {
      const playerPos = (p.position || "").toLowerCase();
      if (pos.length && !pos.includes(playerPos)) return false;
      if (useBest && p.bestPerformance !== true) return false;
      return true;
    });
  }, [players, active]);

  const navigate = useNavigate();
  const handleView = (p) => navigate(`/players/${p.id}`);

  // 3) funciones para agregar y eliminar en memoria (por ahora)
  const addApiPLayers = async (newPlayer) => {
    try {
      const response = await fetch(
        "https://backend-exercises-production.up.railway.app/players",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlayer),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const createdPlayer = await response.json();
      console.log("Player added successfully to API:", createdPlayer);
      return createdPlayer;
    } catch (error) {
      console.error("There was a problem with the add operation:", error);
      return null;
    }
  };

  const add = async (newPlayer) => {
    const createdPlayer = await addApiPLayers(newPlayer);
    if (createdPlayer) {
      setPlayers((prev) => [...prev, createdPlayer]);
    }
  };

  const deletedAPIplayer = async (playerId) => {
    try {
      const response = await fetch(
        `https://backend-exercises-production.up.railway.app/players/${playerId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(`Player with id ${playerId} deleted successfully from API.`);
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };
  const remove = (id) => {
    deletedAPIplayer(id);
    setPlayers((prev) => prev.filter((p) => p.player_id !== id));
  };

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
      remove(selectedPlayer.player_id);
      closeDeleteModal();
    }
    console.log("Deleting player with id:", selectedPlayer.player_id);
  };

  return (
    <>
      <Header handleToggleModal={() => setIsModalOpen((v) => !v)} />
      <main className="players-page">
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
        onSubmit={add}
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
