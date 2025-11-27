import { useURLSearch } from "../hooks/useURLSearch.js";
import { IconLupa } from "../icons/IconsPlayer.jsx";

export function PlayerFilter() {
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
    </div>
  );
}

export default PlayerFilter;
