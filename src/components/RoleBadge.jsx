import { useAuth } from "../hooks/useAuth";

function RoleBadge() {
  const { isAdmin } = useAuth();

  return (
    <div className="sidebar-role">
      <span
        className="role-dot"
        style={{ color: isAdmin ? "#E968FE" : "#602EE1" }}
      >
        ●
      </span>
      <span className="role-label">{isAdmin ? "admin" : "user"}</span>
    </div>
  );
}

export default RoleBadge;
