import { useEffect, useState } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";

export const useGlobalStats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`${API_BACKEND_URL}/stats`).then((res) =>
        res.json()
      );
      setStats(response);
    };

    fetchStats();
  }, []);

  return stats;
};
