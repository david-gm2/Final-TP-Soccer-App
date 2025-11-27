
import { useEffect, useState } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { authFetch } from "../utils/authFetch.js";

export const useMatchesStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await authFetch(`${API_BACKEND_URL}/matches/stats`);
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return stats;
};