export default function UserCard({ user, isAdmin, onToggle }) {
  return (
    <article className="user-card" key={user.id}>
      <div className="user-info">
        <div className="user-avatar">{user.name?.[0] ?? "U"}</div>
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="user-actions">
        <button
          type="button"
          className={`btn ${isAdmin ? "btn-secondary" : "btn-primary"}`}
          onClick={() => onToggle(user)}
        >
          {isAdmin ? "Remove admin" : "Give admin"}
        </button>
      </div>
    </article>
  );
}
