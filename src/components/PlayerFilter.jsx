import { useURLFilters } from "../hooks/useURLFilters.js";
import { useURLSearch } from "../hooks/useURLSearch.js";
import { IconLupa } from "../icons/IconsPlayer.jsx";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Goalkeeper", value: "goalkeeper" },
  { label: "Defender", value: "defender" },
  { label: "Midfielder", value: "midfielder" },
  { label: "Forward", value: "forward" },
  { label: "Best performance", value: "best-performance" },
];

export function PlayerFilter() {
  const { active, toggle } = useURLFilters("position");
  const { value: search, setValue: setSearch } = useURLSearch("q");

  return (
    <div className="player-filter">
      <div className="search-player-box">
        <label htmlFor="players-search">
          <IconLupa width={16} height={16} aria-hidden="true" />
        </label>
        <input
          type="search"
          id="players-search"
          placeholder="Search player..."
          value={search}
          aria-label="Search players"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filtrering">
        {FILTERS.map((filter) => {
          const isAll = filter.value === "all";
          const isChecked = isAll
            ? active.length === 0
            : active.includes(filter.value);

          return (
            <label
              key={filter.value}
              className={`filter-item ${isChecked ? "active" : ""}`}
            >
              <input
                type="checkbox"
                hidden
                checked={isChecked}
                onChange={(event) => toggle(filter.value, event.target.checked)}
              />
              <p>{filter.label}</p>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default PlayerFilter;
