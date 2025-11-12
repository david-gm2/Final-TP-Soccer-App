export function filterPlayers(players, active) {
  if (!active || active.length === 0) return players;
  const useBest = active.includes("best-performance");
  const pos = active.filter(f => f !== "best-performance" && f !== "all");
  return players.filter(p => {
    if (pos.length && !pos.includes((p.position || "").toLowerCase())) return false;
    if (useBest && p.bestPerformance !== true) return false;
    return true;
  });
}