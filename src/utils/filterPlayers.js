export function filterPlayers(players = [], active = [], search = "") {
  const normalizedSearch = (search || "").trim().toLowerCase();
  const useBest = active.includes("best-performance");
  const positions = active.filter(
    (f) => f !== "best-performance" && f !== "all"
  );

  if (!positions.length && !useBest && !normalizedSearch) {
    return players;
  }

  const matchesSearch = (player) => {
    if (!normalizedSearch) return true;
    const text = `${player.nick ?? ""} ${player.name ?? ""} ${
      player.position ?? ""
    } ${player.number ?? ""} ${player.bio ?? ""}`
      .toLowerCase()
      .trim();
    return text.includes(normalizedSearch);
  };

  return players.filter((player) => {
    const playerPos = (player.position || "").toLowerCase();
    if (positions.length && !positions.includes(playerPos)) return false;
    if (useBest && player.bestPerformance !== true) return false;
    return matchesSearch(player);
  });
}
