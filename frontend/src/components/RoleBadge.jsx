function RoleBadge({ role = { dot: "violet", name: "ADMIN" } }) {
  return (
    <div className="header-role">
      <span className="role-dot" style={{ color: role.dot }}>
        ●
      </span>
      <span className="role-label">{role.name}</span>
    </div>
  );
}

export default RoleBadge;
