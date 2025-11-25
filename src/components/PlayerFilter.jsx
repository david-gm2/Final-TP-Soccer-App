import { useURLFilters } from "../hooks/useURLFilters.js";
import { useURLSearch } from "../hooks/useURLSearch.js";
import { IconLupa } from "../../public/icons/IconsPlayer.jsx";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Goalkeeper", value: "goalkeeper" },
  { label: "Defender", value: "defender" },
  { label: "Midfielder", value: "midfielder" },
  { label: "Forward", value: "forward" },
  { label: "Best Performance", value: "best-performance" },
];

export function PlayerFilter() {
  const { active, toggle } = useURLFilters("position");
  const { value: search, setValue: setSearch } = useURLSearch("q");

  return (
    <div className="player-filter">
      <div className="search-player-box">
        <label htmlFor="search">
          <IconLupa width={16} height={16} />
        </label>
        <input
          type="search"
          id="search"
          placeholder="Search player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filtrering">
        {FILTERS.map((f) => {
          const isAll = f.value === "all";
          const isChecked = isAll
            ? active.length === 0
            : active.includes(f.value);

          return (
            <label
              key={f.value}
              className={`filter-item ${isChecked ? "active" : ""}`}
            >
              <input
                type="checkbox"
                hidden
                checked={isChecked}
                onChange={(e) => toggle(f.value, e.target.checked)}
              />
              <p>{f.label}</p>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default PlayerFilter;
