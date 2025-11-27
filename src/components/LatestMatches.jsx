import { useMemo, useState } from "react";
import { useMatches } from "../hooks/useMatches.js";
import { useListMatches } from "../hooks/useListMatches.js";
import "../styles/UpcomingMatches.css";

function LatestMatches() {
  const [isLoading, setIsLoading] = useState(false);
  useListMatches(setIsLoading);
  const { matches: ctxMatches } = useMatches();

  const latest = useMemo(() => {
    const sourceMatches = ctxMatches ?? [];
    if (!Array.isArray(sourceMatches)) return [];
    const normalized = sourceMatches
      .map((match) => {
        const dateValue = match.match_date ?? match.date;
        const dateObj = dateValue ? new Date(dateValue) : null;
        return { ...match, _date: dateObj };
      })
      .filter((match) => match._date && !Number.isNaN(match._date.getTime()));

    return normalized.sort((a, b) => b._date - a._date).slice(0, 3);
  }, [ctxMatches]);

  const rootClass = "latest-matches-list";

  const formatDateTime = (dateObj) => {
    if (!dateObj) return "Date TBA";
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}.${minutes}hs`;
  };

  const resolveLabel = (match) => {
    if (match.name) return match.name;
    if (match.local && match.visitor)
      return `${match.local} vs ${match.visitor}`;
    if (match.homeTeam?.name || match.awayTeam?.name) {
      return `${match.homeTeam?.name ?? "Home"} vs ${match.awayTeam?.name ?? "Away"}`;
    }
    return `Match ${match.match_id ?? match.id ?? ""}`.trim();
  };

  return (
    <div className={rootClass}>
      {isLoading ? (
        <p className="matches-empty">Loading matches...</p>
      ) : !latest.length ? (
        <p className="matches-empty">No matches played yet.</p>
      ) : (
        latest.map((match) => (
          <div
            className="match-card feed-card"
            key={
              match.match_id ?? match.id ?? match.name ?? match._date?.getTime()
            }
          >
            <div>
              <p>{resolveLabel(match)}</p>
              <div className="match-info">
                {formatDateTime(match._date)}
                {match.location ? ` - ${match.location}` : ""}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default LatestMatches;
