import { IconSesionOut } from "../../public/icons/IconsHeader";

function UserInfo({
  user = { name: "Doye", email: "doyel.gusmerotti@gm", avatar: "avatar.jpg" },
  onSignOut,
}) {
  return (
    <div className="header-bottom">
      <div className="user-info">
        <img
          className="user-avatar"
          src={user.avatar}
          alt={`${user.name} avatar`}
        />
        <div className="user-text">
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
        </div>
      </div>

      <button
        type="button"
        className="user-switch-btn"
        onClick={onSignOut}
        aria-label="Cerrar sesión"
      >
        <IconSesionOut />
      </button>
    </div>
  );
}

export default UserInfo;
