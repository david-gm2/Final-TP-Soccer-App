function RoleBadge({ role = { dot: "violet", name: "ADMIN" } }) {
  return (
    <div className="sidebar-role" aria-label={`Signed in as ${role.name}`}>
      <span
        className="role-dot"
        style={{ backgroundColor: role.dot, borderRadius: "50%" }}
        aria-hidden="true"
      />
      <span className="role-label">{role.name}</span>
    </div>
  );
}

export default RoleBadge;
