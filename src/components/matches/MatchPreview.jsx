import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

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
  onDragPlayers,
  enableDrag,
}) {
  const formatLabel = selectedFormat || "Format";
  const requiredPlayers = playerPerTeam || "--";

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
            Auto-balance
          </label>
          <button type="button" className="chip-btn" onClick={onShuffle}>
            Shuffle
          </button>
          <span className="preview-format">{formatLabel}</span>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragPlayers}>
        <div className="teams-grid">
          {[
            { key: "teamA", name: homeTeamName, list: teams.teamA },
            { key: "teamB", name: awayTeamName, list: teams.teamB },
          ].map((team) => (
            <Droppable
              key={team.key}
              droppableId={team.key}
              isDropDisabled={!enableDrag}
            >
              {(provided) => (
                <div
                  className="team-box"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="team-box__header">
                    <strong>{team.name}</strong>
                    <span>
                      {team.list.length}/{requiredPlayers} | {formatLabel}
                    </span>
                  </div>
                  <div className="team-list">
                    {team.list.length === 0 && (
                      <p className="team-placeholder">
                        Select players to build this team.
                      </p>
                    )}
                    {team.list.map((player, index) => (
                      <Draggable
                        key={player.player_id}
                        draggableId={String(player.player_id)}
                        index={index}
                        isDragDisabled={!enableDrag}
                      >
                        {(dragProvided, snapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={`team-player ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <span>
                              #{player.number ?? index + 1} {player.nick}
                            </span>
                            <span>{levelLabel(player.rating)}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                  <div className="team-rate">
                    <p>Team rate</p>
                    <strong>{avgRating(team.list)}</strong>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <div className="rate-summary">
        <p>Rate balance</p>
        <strong>{rateBalance}</strong>
      </div>
    </aside>
  );
}
