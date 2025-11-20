export function MatchPreview({
  teams,
  selectedFormat,
  playerPerTeam,
  autoBalance,
  onToggleAutoBalance,
  onShuffle,
  avgRating,
  rateBalance,
  levelLabel,
  homeTeamName = "Team A",
  awayTeamName = "Team B",
}) {
  return (
    <aside className="match-preview">
      <div className="preview-header">
        <h3>Preview</h3>
        <div className="preview-controls">
          <label className="preview-toggle">
            <input
              type="checkbox"
              checked={autoBalance}
              onChange={(event) => onToggleAutoBalance(event.target.checked)}
            />
            Auto-Balance
          </label>
          <button type="button" className="chip-btn" onClick={onShuffle}>
            Shuffle
          </button>
          <span className="preview-format">{selectedFormat}</span>
        </div>
      </div>

      <div className="teams-grid">
        {[
          { name: homeTeamName, list: teams.teamA },
          { name: awayTeamName, list: teams.teamB },
        ].map((team) => (
          <div key={team.name} className="team-box">
            <div className="team-box__header">
              <strong>{team.name}</strong>
              <span>
                {team.list.length}/{playerPerTeam || "—"} • {selectedFormat}
              </span>
            </div>
            <div className="team-list">
              {team.list.length === 0 && (
                <p className="team-placeholder">Select players to build this team.</p>
              )}
              {team.list.map((player, index) => (
                <div key={player.player_id} className="team-player">
                  <span>
                    #{index + 1} {player.nick}
                  </span>
                  <span>{levelLabel(player.rating)}</span>
                </div>
              ))}
            </div>
            <div className="team-rate">
              <p>Team rate</p>
              <strong>{avgRating(team.list)}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="rate-summary">
        <p>Rate balance</p>
        <strong>{rateBalance}</strong>
      </div>
    </aside>
  );
}
