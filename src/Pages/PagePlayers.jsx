import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { useURLFilters } from "../hooks/useURLFilters.js";
import { useURLSearch } from "../hooks/useURLSearch.js";
import { useListPlayer } from "../hooks/useListPlayer.js";
import { usePlayers } from "../hooks/usePlayers.js";
import { filterPlayers } from "../utils/filterPlayers.js";

import Header from "../components/Header.jsx";
import { PlayerFilter } from "../components/PlayerFilter.jsx";
import { PlayerGrid } from "../components/PlayerGrid.jsx";
import PlayerModal from "../components/PlayerModal.jsx";
import DeletePlayerModal from "../components/DeletePlayerModal.jsx";
import { useAuth } from "../hooks/useAuth.js";

import "../styles/PlayersPage.css";
import "../styles/PlayerFiltrer.css";
import "../styles/PlayerModal.css";

function PlayersPage() {
  const { isAdmin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasOpenedFromState = useRef(false);

  // Fetch players on mount (setIsLoading keeps the loading indicator in sync)
  useListPlayer(setIsLoading);

  // Get players from context
  const { players, setPlayers, setLastFetched } = usePlayers();

  // Get position filters from URL
  const { active } = useURLFilters("position");
  const { value: searchQuery } = useURLSearch("q");

  // Filter players based on selected positions + search term
  const filtered = useMemo(
    () => filterPlayers(players, active, searchQuery),
    [players, active, searchQuery]
  );
  const emptyMessage = searchQuery?.trim()
    ? `No players match "${searchQuery.trim()}".`
    : "No players available yet. Add your first player or try adjusting your filters.";

  const navigate = useNavigate();
  const location = useLocation();
  const handleView = (player) => {
    if (!player?.player_id) return;
    navigate(`/players/id/${player.player_id}`);
  };

  useEffect(() => {
    if (hasOpenedFromState.current) return;
    if (location.state?.openCreateModal) {
      hasOpenedFromState.current = true;
      openCreateModal();
    }
  }, [location.state]);

  const createPlayer = async (newPlayer) => {
    setIsLoading(true);
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

      return await response.json();
    } catch (error) {
      console.error("Error creating player:", error);
      alert("Error creating player. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

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

  const deletePlayer = async (playerId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BACKEND_URL}/players/${playerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete player: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("Error deleting player. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpsertPlayer = async (formData) => {
    const sanitizeNumber = (value) => {
      if (value === undefined || value === null || value === "")
        return undefined;
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) ? undefined : parsed;
    };

    const payload = {
      nick: formData.nick?.trim(),
      position: formData.position?.toLowerCase(),
      rating: Number.parseFloat(formData.rating),
    };

    const jerseyNumber = sanitizeNumber(formData.number);
    if (jerseyNumber !== undefined) payload.number = jerseyNumber;

    if (modalMode === "edit" && editingPlayer?.player_id) {
      const updated = await updatePlayer(editingPlayer.player_id, payload);
      if (updated) {
        setPlayers((prev) =>
          prev.map((player) =>
            player.player_id === updated.player_id
              ? { ...player, ...updated }
              : player
          )
        );
        setLastFetched?.(Date.now());
      }
    } else {
      const createdPlayer = await createPlayer(payload);
      if (createdPlayer) {
        setPlayers((prev) => [createdPlayer, ...prev]);
        setLastFetched?.(Date.now());
      }
    }

    closeModal();
  };

  const handleRemovePlayer = async (playerId) => {
    const success = await deletePlayer(playerId);
    if (success) {
      setPlayers((prev) => prev.filter((p) => p.player_id !== playerId));
      setLastFetched?.(Date.now());
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setEditingPlayer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (player) => {
    setModalMode("edit");
    setEditingPlayer(player);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlayer(null);
    setModalMode("create");
  };

  // Delete modal handlers
  const openDeleteModal = (player) => {
    setPlayerToDelete(player);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPlayerToDelete(null);
  };

  const confirmDelete = async () => {
    if (playerToDelete?.player_id) {
      await handleRemovePlayer(playerToDelete.player_id);
    }
    closeDeleteModal();
  };

  return (
    <>
      <Header
        title="Players"
        subtitle="Manage your team of players"
        actions={[
          {
            text: "Add player",
            className: "btn btn-primary",
            icon: "plus",
            onClick: openCreateModal,
          },
        ]}
      />
      <main className="players-page">
        <PlayerFilter />

        <PlayerGrid
          players={filtered}
          onView={handleView}
          onEdit={openEditModal}
          onOpenDeleteModal={openDeleteModal}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
        />
      </main>
      (
      {isAdmin && (
        <PlayerModal
          isOpen={isModalOpen}
          mode={modalMode}
          initialPlayer={editingPlayer}
          onClose={closeModal}
          onSubmit={handleUpsertPlayer}
        />
      )}
      )
      {isAdmin && (
        <DeletePlayerModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          player={playerToDelete}
        />
      )}
    </>
  );
}

export default PlayersPage;
