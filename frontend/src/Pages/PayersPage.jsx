import "../styles/PlayersPage.css";

function PlayersPage() {
  return (
    <main className="players-page">
      <div>
        <h1>Player</h1>
        <h3>Manage your team of players</h3>
      </div>

      <div>
        <button className="button-add"> + Add players</button>
      </div>
    </main>
  );
}

export default PlayersPage;
