import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { usePlayers } from "../hooks/usePlayer.js";
import { useURLFilters } from "../hooks/useURLFilters.js";

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

  const { players, add, remove } = usePlayers();
  const { active } = useURLFilters("position");
  const navigate = useNavigate();
  const location = useLocation();

  const searchTerm = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get("q") ?? "").toLowerCase();
  }, [location.search]);

  const filteredByPosition = useMemo(() => {
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

  const filtered = useMemo(() => {
    if (!searchTerm) return filteredByPosition;

    return filteredByPosition.filter((p) =>
      (p.name || "").toLowerCase().includes(searchTerm)
    );
  }, [filteredByPosition, searchTerm]);

  const handleView = (p) => navigate(`/players/${p.id}`);

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
      remove(selectedPlayer.id);
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
