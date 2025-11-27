import { useMemo, useState } from "react";
import { useMatches } from "../hooks/useMatches.js";
import { useListMatches } from "../hooks/useListMatches.js";
import "../styles/UpcomingMatches.css";

function UpcomingMatches({ matches: propMatches }) {
  const [isLoading, setIsLoading] = useState(false);
  useListMatches(setIsLoading);
  const { matches: ctxMatches } = useMatches();

  const upcoming = useMemo(() => {
    const sourceMatches = propMatches ?? ctxMatches ?? [];
    if (!Array.isArray(sourceMatches)) return [];
    const normalized = sourceMatches
      .map((match) => {
        const dateValue = match.match_date ?? match.date;
        const dateObj = dateValue ? new Date(dateValue) : null;
        return { ...match, _date: dateObj };
      })
      .filter((match) => match._date && !Number.isNaN(match._date.getTime()));

    return normalized.sort((a, b) => a._date - b._date).slice(0, 3);
  }, [ctxMatches, propMatches]);

  const rootClass = "upcoming-matches-list";

  const formatDateTime = (dateObj) => {
    if (!dateObj) return "Date TBA";
    return dateObj.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const resolveLabel = (match) => {
    if (match.name) return match.name;
    if (match.local && match.visitor)
      return `${match.local} vs ${match.visitor}`;
    if (match.homeTeam?.name || match.awayTeam?.name) {
      return `${match.homeTeam?.name ?? "Home"} vs ${match.awayTeam?.name ?? "Away"}`;
    }
    return `Match ${match.match_id ?? ""}`.trim();
  };

  return (
    <div className={rootClass}>
      {isLoading ? (
        <p className="matches-empty">Loading matches...</p>
      ) : !upcoming.length ? (
        <p className="matches-empty">No upcoming matches yet.</p>
      ) : (
        upcoming.map((match) => (
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

export default UpcomingMatches;
