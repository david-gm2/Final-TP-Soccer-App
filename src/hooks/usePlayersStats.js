import { useEffect, useState } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";

export const usePlayersStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`${API_BACKEND_URL}/stats/players`).then(
        (res) => res.json()
      );
      setStats(response);
    };

    fetchStats();
  }, []);

  return stats;
};
