// src/pages/PlayersPage.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePlayers } from "../hooks/usePlayer.js";
import { useURLFilters } from "../hooks/useURLFilters.js";

import { HeaderPlayerPage } from "../components/HeaderPlayerPage.jsx";
import { PlayerFilter } from "../components/PlayerFilter.jsx";
import { PlayerGrid } from "../components/PlayerGrid.jsx";
import PlayerModal from "../components/PlayerModal.jsx";

import "../styles/PlayersPage.css";
import "../styles/PlayerFiltrer.css";
import "../styles/PlayersCard.css";
import "../styles/PlayerModal.css";

function PlayersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { players, add, remove } = usePlayers();
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
  const handleDelete = (id) => remove(id);

  return (
    <>
      <main className="players-page">
        <HeaderPlayerPage handleToggleModal={() => setIsModalOpen((v) => !v)} />
        <PlayerFilter />
        <PlayerGrid
          players={filtered}
          onView={handleView}
          onDelete={handleDelete}
        />
      </main>

      <PlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={add}
      />
    </>
  );
}

export default PlayersPage;
