import { IconLupa, IconDefaultUser } from "../../icons/IconsPlayer.jsx";

export function PlayerSelection({
  selectedCount,
  searchValue,
  onSearchChange,
  filters,
  activeFilters,
  onToggleFilter,
  players,
  isLoading,
  selectedPlayers,
  onTogglePlayer,
  levelLabel,
  formatPosition,
}) {
  const renderList = () => {
    if (isLoading) return <p className="players-empty">Loading players...</p>;
    if (!players.length)
      return <p className="players-empty">No players found.</p>;

    return players.map((player) => {
      const selectionIndex = selectedPlayers.indexOf(player.player_id);
      const displayNumber = `#${player.number ?? "--"}`;

      return (
        <label
          key={player.player_id}
          className={`player-selection__item ${
            selectionIndex >= 0 ? "selected" : ""
          }`}
        >
          <div className="player-selection__info">
            <div className="player-selection__avatar">
              {player.img ? (
                <img src={player.img} alt={player.nick} />
              ) : (
                <IconDefaultUser width={40} height={40} />
              )}
            </div>
            <div className="player-selection__details">
              <strong>
                {displayNumber} {player.nick || "Unknown"}
              </strong>
              <span>{formatPosition(player.position)}</span>
            </div>
          </div>

          <div className="player-selection__meta">
            <span className="player-level">{levelLabel(player.rating)}</span>
            <input
              type="checkbox"
              checked={selectionIndex >= 0}
              onChange={() => onTogglePlayer(player.player_id)}
              aria-label={`Select ${player.nick}`}
            />
          </div>
        </label>
      );
    });
  };

  return (
    <section className="player-selection-card match-formad-card">
      <div className="player-selection__header">
        <div>
          <h2 className="match-format-title">Player selection</h2>
          <p>Choose who will play the next match.</p>
        </div>
        <span className="player-selection__counter">
          {selectedCount} players selected
        </span>
      </div>

      <div className="player-filter">
        <div className="search-player-box">
          <label htmlFor="match-player-search">
            <IconLupa width={18} height={18} aria-hidden="true" />
          </label>
          <input
            id="match-player-search"
            type="search"
            placeholder="Search player..."
            aria-label="Search players for the match"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="filtrering">
          {filters.map((filter) => {
            const isAll = filter.value === "all";
            const isActive = isAll
              ? activeFilters.length === 0
              : activeFilters.includes(filter.value);

            return (
              <label
                key={filter.value}
                className={`filter-item ${isActive ? "active" : ""}`}
              >
                <input
                  type="checkbox"
                  hidden
                  checked={isActive}
                  onChange={(event) =>
                    onToggleFilter(filter.value, event.target.checked)
                  }
                />
                <p>{filter.label}</p>
              </label>
            );
          })}
        </div>
      </div>

      <div className="player-selection__list">{renderList()}</div>
    </section>
  );
}
