import { useAuth } from "../hooks/useAuth";

function RoleBadge({ role = { dot: "violet", name: "ADMIN" } }) {
  const { isAdmin } = useAuth();

  return (
    <div className="sidebar-role">
      <span className="role-dot" style={{ color: role.dot }}>
        ●
      </span>
      <span className="role-label">{isAdmin ? "admin" : "user"}</span>
    </div>
  );
}

export default RoleBadge;
