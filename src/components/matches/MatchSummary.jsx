import { useMemo } from "react";

export function MatchSummary({ match, onCopy }) {
  const payload = useMemo(() => JSON.stringify(match, null, 2), [match]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      onCopy?.("Match payload copied to clipboard.");
    } catch (error) {
      console.error("Unable to copy payload", error);
      onCopy?.("Unable to copy payload. Please try again.");
    }
  };

  return (
    <section className="match-summary-card">
      <header className="match-summary-card__header">
        <div>
          <p className="match-summary-card__eyebrow">Match payload</p>
          <h3>Ready to submit</h3>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleCopy}>
          Copy JSON
        </button>
      </header>

      <div className="match-summary-card__info">
        <div>
          <span>Match name</span>
          <strong>{match.name ?? "Unnamed match"}</strong>
        </div>
        <div>
          <span>Location</span>
          <strong>{match.location || "—"}</strong>
        </div>
        <div>
          <span>Date</span>
          <strong>
            {match.match_date
              ? new Date(match.match_date).toLocaleString()
              : "No date selected"}
          </strong>
        </div>
        <div>
          <span>Players per team</span>
          <strong>{match.playerPerTeam || "—"}</strong>
        </div>
      </div>

      <div className="match-summary-card__teams">
        {[match.homeTeam, match.awayTeam].map((team, index) => (
          <article key={index}>
            <header>
              <p>{index === 0 ? "Team A" : "Team B"}</p>
              <strong>{team?.name || "Unnamed team"}</strong>
            </header>
            <p className="team-counter">
              {team?.playersIds?.length ?? 0} players selected
            </p>
            <p className="team-players">
              {team?.playersIds?.length
                ? team.playersIds.join(", ")
                : "Select players to build this team."}
            </p>
          </article>
        ))}
      </div>

      <pre className="match-summary-card__payload">{payload}</pre>
    </section>
  );
}

