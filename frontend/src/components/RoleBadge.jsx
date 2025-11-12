function RoleBadge({ role = { dot: "violet", name: "ADMIN" } }) {
  return (
    <div className="sidebar-role">
      <span className="role-dot" style={{ color: role.dot }}>
        ●
      </span>
      <span className="role-label">{role.name}</span>
    </div>
  );
}

export default RoleBadge;
