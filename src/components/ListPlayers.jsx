import React from "react";

function ListPlayers() {
  const players = [
    {
      id: 1,
      name: "John Doe",
      matches: 20,
      goals: 15,
      goalsPerMatch: 0.75,
      performance: "A",
      victories: 12,
      winRate: "60",
      record: { wins: 12, draws: 5, losses: 3 },
    },
  ];
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
          <tr>
            {players.map((player) => (
              <React.Fragment key={player.id}>
                <td>{player.name}</td>
                <td>{player.matches}</td>
                <td>⚽ {player.goals}</td>
                <td>{player.goalsPerMatch}</td>
                <td>⭐ {player.performance}</td>
                <td>🏆 {player.victories}</td>
                <td>{player.winRate}%</td>
                <td>
                  {player.record.wins}W-{player.record.draws}D-
                  {player.record.losses}L
                </td>
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ListPlayers;
