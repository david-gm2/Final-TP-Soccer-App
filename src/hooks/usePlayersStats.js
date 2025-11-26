import { useEffect, useState } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { authFetch } from "../utils/authFetch.js";

export const usePlayersStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await authFetch(`${API_BACKEND_URL}/stats/players`);
      const data = await response.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return stats;
};
