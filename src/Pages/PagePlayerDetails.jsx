import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Radar } from "react-chartjs-2";

import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { IconDefaultUser, IconDelete } from "../icons/IconsPlayer.jsx";
import Header from "../components/Header.jsx";
import PlayerModal from "../components/PlayerModal.jsx";
import DeletePlayerModal from "../components/DeletePlayerModal.jsx";
import { usePlayers } from "../hooks/usePlayers.js";
import { authFetch } from "../utils/authFetch.js";

import "../styles/PlayerDetails.css";

const DEFAULT_MATCHES = [
  {
    id: 1,
    result: "9-10",
    location: "Fulbito Arena",
    winner: "Team A",
    date: "Jan 11, 2050",
    playerRate: 7.2,
    matchRate: 7.2,
  },
  {
    id: 2,
    result: "11-8",
    location: "Fulbito Arena",
    winner: "Team B",
    date: "Jan 11, 2050",
    playerRate: 7.2,
    matchRate: 1.4,
  },
  {
    id: 3,
    result: "11-13",
    location: "Fulbito Arena",
    winner: "Team A",
    date: "Jan 11, 2050",
    playerRate: 7.2,
    matchRate: 10,
  },
];

const DEFAULT_NOTES = [
  { id: 8, text: "Shows high adaptability across multiple positions." },
  { id: 7, text: "Displays spatial intelligence for passing lanes." },
  { id: 4, text: "Maintains close control in tight spaces." },
  { id: 3, text: "Demonstrates leadership and communication." },
];

function PagePlayerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setPlayers, setLastFetched } = usePlayers();
  const [player, setPlayer] = useState(location.state?.player ?? null);
  const [loading, setLoading] = useState(!location.state?.player);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6;

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        setLoading(true);
        const response = await authFetch(
          `${API_BACKEND_URL}/players/id/${id}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch player: ${response.statusText}`);
        }

        const data = await response.json();
        setPlayer(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching player details:", err);
        setError("Unable to load player details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlayerDetails();
    }
  }, [id]);

  const handleDeletePlayer = async () => {
    if (!player?.player_id) return;
    try {
      const response = await authFetch(
        `${API_BACKEND_URL}/players/${player.player_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete player: ${response.statusText}`);
      }
      navigate("/players");
      if (typeof setPlayers === "function") {
        setPlayers((prev) =>
          prev.filter((p) => p.player_id !== player.player_id)
        );
        setLastFetched?.(Date.now());
      }
    } catch (err) {
      console.error("Error deleting player:", err);
      alert("Unable to delete player, please try again.");
    }
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const sanitizeNumber = (value) => {
    if (value === undefined || value === null || value === "") return undefined;
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  };

  const handleEditPlayer = async (formData) => {
    if (!player?.player_id) return;
    const payload = {
      nick: formData.nick?.trim(),
      position: formData.position?.toLowerCase(),
      rating: Number.parseFloat(formData.rating),
    };
    const jerseyNumber = sanitizeNumber(formData.number);
    if (jerseyNumber !== undefined) payload.number = jerseyNumber;

    try {
      const response = await authFetch(
        `${API_BACKEND_URL}/players/${player.player_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update player: ${response.statusText}`);
      }
      const updated = await response.json();
      setPlayer((prev) => ({ ...prev, ...updated }));
      if (typeof setPlayers === "function") {
        setPlayers((prev) =>
          prev.map((p) =>
            p.player_id === updated.player_id ? { ...p, ...updated } : p
          )
        );
        setLastFetched?.(Date.now());
      }
      closeEditModal();
    } catch (err) {
      console.error("Error updating player:", err);
      alert("Unable to update player. Please try again.");
    }
  };

  const recentMatches = useMemo(
    () => player?.recentMatches ?? DEFAULT_MATCHES,
    [player?.recentMatches]
  );
  const playerNotes = useMemo(
    () => player?.notes ?? DEFAULT_NOTES,
    [player?.notes]
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(recentMatches.length / rowsPerPage)),
    [recentMatches.length]
  );

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedMatches = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return recentMatches.slice(start, start + rowsPerPage);
  }, [recentMatches, currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage((prev) => {
      const nextPage = Math.max(1, Math.min(page, totalPages));
      return nextPage === prev ? prev : nextPage;
    });
  };

  if (loading) {
    return (
      <>
        <Header title="Loading player" subtitle="Fetching player details..." />
        <main className="player-details-page">
          <div className="loading">Loading player details...</div>
        </main>
      </>
    );
  }

  if (error || !player) {
    return (
      <>
        <Header title="Player details" subtitle="Unable to load player" />
        <main className="player-details-page">
          <div className="error">
            <p>{error || "Player not found"}</p>
            <button className="btn" onClick={() => navigate("/players")}>
              Back to Players
            </button>
          </div>
        </main>
      </>
    );
  }

  const chartData = {
    labels: [
      "Finishing",
      "Positioning",
      "Acceleration",
      "Dribbling",
      "Overall",
    ],
    datasets: [
      {
        label: `Skills de ${player.nick}`,
        data: [
          player.sho || 80,
          player.pac || 80,
          player.phy || 80,
          player.dri || 80,
          player.shooting || 80,
        ],
        backgroundColor: "rgba(167, 139, 250, 0.2)",
        borderColor: "rgba(167, 139, 250, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(167, 139, 250, 1)",
        pointHoverBackgroundColor: "#fff",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: { stepSize: 25, font: { size: 11 } },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
    plugins: { legend: { display: false }, title: { display: false } },
    maintainAspectRatio: true,
  };

  const formatLabel = (value, fallback = "--") => {
    if (!value && value !== 0) return fallback;
    if (typeof value !== "string") return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const playerLevel =
    Number(player.rating ?? 0) || Number(player.avgPerformance ?? 0) || 8.5;
  const formattedLevel = Number.isFinite(playerLevel)
    ? playerLevel.toFixed(1)
    : playerLevel;
  const formattedPosition = formatLabel(player.position, "Player");
  const jerseyNumber = player.number ?? "--";
  const headerSubtitle = `${formattedPosition} · #${jerseyNumber}`;

  const summaryChips = [
    { id: "status", label: "Ready to play", tone: "success" },
    { id: "level", label: `Lv ${formattedLevel}`, tone: "level" },
    { id: "style", label: player.style ?? "Offensive", tone: "neutral" },
    { id: "position", label: formattedPosition, tone: "neutral" },
    { id: "number", label: `#${jerseyNumber}`, tone: "outline" },
  ];

  const statCards = [
    {
      id: "wins",
      label: "Wins rate",
      value: `${player.winsRate ?? 75}%`,
      icon: "chart",
    },
    {
      id: "assists",
      label: "Total assists",
      value: player.assists ?? 7,
      icon: "star",
    },
    {
      id: "goals",
      label: "Total goals",
      value: player.goals ?? 18,
      icon: "ball",
    },
    {
      id: "matches",
      label: "Total matches",
      value: player.totalMatches ?? 24,
      icon: "calendar",
    },
  ];

  return (
    <>
      <Header
        title={player.nick}
        subtitle={headerSubtitle}
        actions={[
          {
            key: "delete",
            text: "Delete player",
            className: "btn btn-icon btn-danger",
            icon: <IconDelete width="17" height="19" />,
            onClick: openDeleteModal,
          },
          {
            key: "edit",
            text: "Edit",
            className: "btn btn-secondary",
            icon: "pen",
            onClick: openEditModal,
          },
        ]}
      />
      <main className="player-details-page">
        <section className="player-summary-card">
          //TODO poner esto en el header pasarlo como porp
          <div className="player-summary__chips">
            {summaryChips.map((chip) => (
              <span key={chip.id} className={`player-pill ${chip.tone}`}>
                {chip.tone === "success" && (
                  <span className="status-dot ready" />
                )}
                {chip.label}
              </span>
            ))}
          </div>
        </section>

        <div className="stats-row">
          {statCards.map((card) => (
            <article key={card.id} className="stat-item">
              <div className="stat-item__header">
                <p>{card.label}</p>
                <span aria-hidden="true">{card.icon}</span>
              </div>
              <strong className="stat-value">{card.value}</strong>
            </article>
          ))}
        </div>

        <div className="content-row">
          <div className="player-card-details">
            <div className="player-position-label">{formattedPosition}</div>
            <div className="player-image-circle">
              {player.img ? (
                <img src={player.img} alt={player.nick} />
              ) : (
                <IconDefaultUser width="100" height="100" />
              )}
            </div>
            <h2>{player.nick}</h2>
            <div className="player-card-meta">
              <div>
                <span>Rating</span>
                <strong>{formattedLevel}</strong>
              </div>
              <div>
                <span>Role</span>
                <strong>{formatLabel(player.role, formattedPosition)}</strong>
              </div>
              <div>
                <span>Preferred foot</span>
                <strong>{formatLabel(player.foot, "Right")}</strong>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-pair">
                <span className="stat-label">{player.pac || 76} PAC</span>
                <span className="stat-label">{player.dri || 76} DRI</span>
              </div>
              <div className="stat-pair">
                <span className="stat-label">{player.sho || 76} SHO</span>
                <span className="stat-label">{player.def || 76} DEF</span>
              </div>
              <div className="stat-pair">
                <span className="stat-label">{player.pas || 76} PAS</span>
                <span className="stat-label">{player.phy || 76} PHY</span>
              </div>
            </div>
          </div>

          <div className="skills-card">
            <div className="skills-header">
              <h3>Skills</h3>
              <div className="toggle-buttons">
                <button className="toggle-btn active">General</button>
                <button className="toggle-btn">Player</button>
              </div>
            </div>

            <div className="radar-container">
              <Radar data={chartData} options={chartOptions} />
            </div>

            <div className="performance-stats">
              <div className="perf-stat">
                <label>AVG PERFORMANCE</label>
                <div className="perf-value">{player.avgPerformance || 8.3}</div>
              </div>
              <div className="perf-stat">
                <label>GOAL PER MATCH</label>
                <div className="perf-value">{player.goalPerMatch || 0.8}</div>
              </div>
            </div>
          </div>
        </div>

        <section className="recent-matches">
          <div className="section-header">
            <h3>Recent Matches</h3>
            <button className="btn-icon" type="button">
              +
            </button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Result</th>
                  <th>Location</th>
                  <th>Winner Team</th>
                  <th>Date</th>
                  <th>Rate player</th>
                  <th>Match Rate</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMatches.map((match) => (
                  <tr key={match.id}>
                    <td>{match.result}</td>
                    <td>{match.location}</td>
                    <td>{match.winner}</td>
                    <td>{match.date}</td>
                    <td>{match.playerRate}</td>
                    <td>{match.matchRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <button
              type="button"
              className="link-button"
              onClick={() => handleChangePage(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Go to previous page"
            >
              &lt; Prev
            </button>
            <div className="table-pagination">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    type="button"
                    className={`btn ${page === currentPage ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => handleChangePage(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="link-button"
              onClick={() => handleChangePage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Go to next page"
            >
              Next &gt;
            </button>
          </div>
        </section>
        <section className="player-notes">
          <div className="section-header">
            <h3>Player Notes</h3>
            <button className="btn-icon" type="button">
              +
            </button>
          </div>
          <div className="notes-grid">
            {playerNotes.map((note) => (
              <article key={note.id}>
                <span className="note-label">Note #{note.id}</span>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <PlayerModal
        isOpen={isEditModalOpen}
        initialPlayer={player}
        mode="edit"
        onSubmit={handleEditPlayer}
        onClose={closeEditModal}
      />

      <DeletePlayerModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => {
          handleDeletePlayer();
          closeDeleteModal();
        }}
        player={player}
      />
    </>
  );
}

export default PagePlayerDetails;
