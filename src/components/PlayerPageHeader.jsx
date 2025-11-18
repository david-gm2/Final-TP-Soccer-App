export function HeaderPlayerPage({ handleToggleModal }) {
  return (
    <article className="players-header">
      <div>
        <h1>Player</h1>
        <h3>Manage your team of players</h3>
      </div>
      <div>
        <button
          className="button-add"
          onClick={handleToggleModal}
          type="button"
        >
          + Add players
        </button>
      </div>
    </article>
  );
}
