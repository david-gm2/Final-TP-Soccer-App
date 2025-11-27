import { useEffect, useState } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { authFetch } from "../utils/authFetch.js";

const EMPTY_STATS = {
  totalMatches: 0,
  totalGoals: 0,
  totalAssists: 0,
  activePlayers: 0,
};

const normalize = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

export const useMatchesStats = () => {
  const [stats, setStats] = useState(EMPTY_STATS);

  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      try {
        const response = await authFetch(`${API_BACKEND_URL}/matches/stats`);
        if (!response.ok) {
          if (mounted) setStats(EMPTY_STATS);
          return;
        }
        const data = await response.json();
        if (!mounted) return;
        setStats({
          totalMatches: normalize(data.totalMatches ?? data.total_matches),
          totalGoals: normalize(data.totalGoals ?? data.total_goals),
          totalAssists: normalize(data.totalAssists ?? data.total_assists),
          activePlayers: normalize(data.activePlayers ?? data.active_players),
        });
      } catch (err) {
        console.warn("useMatchesStats: unable to fetch stats", err);
        if (mounted) setStats(EMPTY_STATS);
      }
    };

    fetchStats();
    return () => {
      mounted = false;
    };
  }, []);

  return stats;
};
