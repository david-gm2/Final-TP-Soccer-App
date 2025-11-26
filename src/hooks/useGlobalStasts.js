import { useEffect, useState } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { authFetch } from "../utils/authFetch.js";

export const useGlobalStats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const response = await authFetch(`${API_BACKEND_URL}/stats`);
      const data = await response.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return stats;
};
