import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Radar } from "react-chartjs-2";

import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { IconDefaultUser } from "../../public/icons/IconsPlayer.jsx";

import "../styles/PlayerDetails.css";

// Mock data for testing
const MOCK_PLAYERS = {
  1: {
    player_id: "1",
    nick: "Juan V.",
    position: "Midfielder",
    number: 9,
    winsRate: 75,
    totalMatches: 24,
    assists: 7,
    goals: 18,
    pac: 76,
    dri: 76,
    sho: 76,
    def: 76,
    pas: 76,
    phy: 76,
    avgPerformance: 8.3,
    goalPerMatch: 0.8,
    img: "https://via.placeholder.com/150",
  },
  2: {
    player_id: "2",
    nick: "Lionel Messi",
    position: "Forward",
    number: 10,
    winsRate: 82,
    totalMatches: 22,
    assists: 40,
    goals: 129,
    pac: 87,
    dri: 91,
    sho: 92,
    def: 38,
    pas: 91,
    phy: 85,
    avgPerformance: 8.7,
    goalPerMatch: 0.9,
    img: "https://via.placeholder.com/150",
  },
  3: {
    player_id: "3",
    nick: "Kylian Mbappé",
    position: "Forward",
    number: 9,
    winsRate: 78,
    totalMatches: 26,
    assists: 35,
    goals: 87,
    pac: 96,
    dri: 89,
    sho: 89,
    def: 32,
    pas: 79,
    phy: 92,
    avgPerformance: 8.5,
    goalPerMatch: 1.2,
    img: "https://via.placeholder.com/150",
  },
};

function PagePlayerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BACKEND_URL}/players/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch player: ${response.statusText}`);
        }

        const data = await response.json();
        setPlayer(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching player details:", err);
        // Use mock data as fallback
        const mockData = MOCK_PLAYERS[id];
        if (mockData) {
          setPlayer(mockData);
          setError(null);
        } else {
          setError("No data available for this player");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlayerDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="player-details">
        <div className="loading">Loading player details...</div>
      </main>
    );
  }

  if (error || !player) {
    return (
      <main className="player-details">
        <div className="error">
          <p>{error || "Player not found"}</p>
          <button className="btn" onClick={() => navigate("/players")}>
            Back to Players
          </button>
        </div>
      </main>
    );
  }

  // Chart data for radar
  const chartData = {
    labels: [
      "Finishing",
      "Positioning",
      "Acceleration",
      "Dribbling",
      "Overall",
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
          player.speed || 80,
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
        ticks: {
          stepSize: 25,
          font: { size: 11 },
        },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    maintainAspectRatio: true,
  };

  return (
    <main className="player-details">
      {/* Stats Overview */}
      <div className="stats-row">
        <div className="stat-item">
          <label>WINS RATE</label>
          <div className="stat-value">{player.winsRate || 75}%</div>
          <div className="stat-icon">📊</div>
        </div>
        <div className="stat-item">
          <label>TOTAL ASSISTS</label>
          <div className="stat-value">{player.assists || 7}</div>
          <div className="stat-icon">⭐</div>
        </div>
        <div className="stat-item">
          <label>TOTAL GOALS</label>
          <div className="stat-value">{player.goals || 18}</div>
          <div className="stat-icon">⚽</div>
        </div>
        <div className="stat-item">
          <label>TOTAL MATCHES</label>
          <div className="stat-value">{player.totalMatches || 24}</div>
          <div className="stat-icon">👥</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-row">
        {/* Left - Player Card */}
        <div className="player-card">
          <div className="player-position-label">{player.position}</div>
          <div className="player-image-circle">
            {player.img ? (
              <img src={player.img} alt={player.nick} />
            ) : (
              <IconDefaultUser width="100" height="100" />
            )}
          </div>
          <h2>{player.nick}</h2>

          <div className="stats-grid">
            <div className="stat-pair">
              <span className="stat-label">{player.pac} PAC</span>
              <span className="stat-label">{player.dri} DRI</span>
            </div>
            <div className="stat-pair">
              <span className="stat-label">{player.sho} SHO</span>
              <span className="stat-label">{player.def} DEF</span>
            </div>
            <div className="stat-pair">
              <span className="stat-label">{player.pas} PAS</span>
              <span className="stat-label">{player.phy} PHY</span>
            </div>
          </div>
        </div>

        {/* Right - Skills and Performance */}
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
              <div className="perf-icon">📊</div>
            </div>
            <div className="perf-stat">
              <label>GOAL PER MATCH</label>
              <div className="perf-value">{player.goalPerMatch || 0.8}</div>
              <div className="perf-icon">⭐</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PagePlayerDetails;
