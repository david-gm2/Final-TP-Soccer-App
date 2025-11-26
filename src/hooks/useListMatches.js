import { useEffect } from "react";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { useMatches } from "./useMatches.js";
import { useAuth } from "../hooks/useAuth.js";

const CACHE_KEY = "matches-cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function useListMatches(setIsLoading) {
  const { matches, setMatches, lastFetched, setLastFetched } = useMatches();
  const { accessToken } = useAuth();

  useEffect(() => {
    let mounted = true;

    const readCache = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        if (!Array.isArray(parsed?.data)) return null;
        return parsed;
      } catch (err) {
        console.warn("useListMatches: unable to parse cache", err);
        return null;
      }
    };

    const cached = readCache();
    if (cached && Array.isArray(cached.data) && !matches.length) {
      setMatches?.(cached.data);
    }

    const shouldFetch =
      !cached ||
      !cached.timestamp ||
      Date.now() - cached.timestamp > CACHE_TTL_MS ||
      !cached.data?.length;

    const fetchMatches = async () => {
      if (typeof setIsLoading === "function") setIsLoading(true);
      try {
        const res = await fetch(`${API_BACKEND_URL}/matches`, {
          headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(`Failed to fetch matches: ${res.status}`);
        const data = await res.json();
        if (mounted && typeof setMatches === "function") {
          setMatches(data);
          if (typeof setLastFetched === "function") setLastFetched(Date.now());
        }
      } catch (err) {
        console.error("useListMatches: Error fetching matches:", err);
      } finally {
        if (typeof setIsLoading === "function") setIsLoading(false);
      }
    };

    if (shouldFetch) {
      fetchMatches();
    }

    return () => {
      mounted = false;
    };
  }, [matches.length, setIsLoading, setMatches, setLastFetched, lastFetched, accessToken]);

  return matches;
}
