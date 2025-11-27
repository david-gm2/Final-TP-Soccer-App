import { useMemo } from "react";
import { usePlayersStats } from "../hooks/usePlayersStats.js";
import { useURLSearch } from "../hooks/useURLSearch.js";
import { filterPlayers } from "../utils/filterPlayers.js";

function ListPlayers() {
  const playersStats = usePlayersStats();
  const { value: search } = useURLSearch("q");

  const filteredPlayers = useMemo(
    () => filterPlayers(playersStats, [], search),
    [playersStats, search]
  );

  return (
    <div className="list-players">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Matches</th>
            <th>Goals</th>
            <th>Goals/Match</th>
            <th>Performance</th>
            <th>Victories</th>
            <th>Win Rate</th>
            <th>Record</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.player_id}>
              <td>{player.nick}</td>
              <td>{player.matches}</td>
              <td>⚽ {player.goals}</td>
              <td>{player.goalsPerMatch}</td>
              <td>⭐ {player.rating}</td>
              <td>🏆 {player.wins}</td>
              <td>{player.rating}%</td>
              <td>
                {player.wins}W-{player.draws}D-
                {player.losses}L
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPlayers;
