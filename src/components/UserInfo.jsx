import { IconSesionOut } from "../../public/icons/IconSidebar";
import { IconDefaultUser } from "../../public/icons/IconsPlayer";

function UserInfo(props) {
  // Desestructuro con fallback para evitar que props sea undefined
  const { user, roleUser, onSignOut } = props || {};

  const isLoggedIn = !!user;

  const displayName = user?.name || user?.user_name || "Invitado";
  const displayEmail = user?.email || "";

  const avatarSrc = user && user.avatar ? user.avatar : null;

  return (
    <div className="sidebar-bottom">
      <div className="user-info">
        {/* Avatar o icono por defecto */}
        {avatarSrc ? (
          <img
            className="user-avatar"
            src={avatarSrc}
            alt={`${displayName} avatar`}
          />
        ) : (
          <IconDefaultUser width="24" height="24" className="user-avatar" />
        )}

        {/* Texto del usuario */}
        <div className="user-text">
          <p className="user-name">{displayName}</p>
          {displayEmail && <p className="user-email">{displayEmail}</p>}
        </div>

        {/* Botón de cerrar sesión solo si hay usuario */}
        {isLoggedIn && (
          <button
            className="user-switch-btn"
            onClick={onSignOut}
            aria-label="Sign out"
          >
            <IconSesionOut />
          </button>
        )}
      </div>

      {/* Botón de Request Admin Access solo si hay usuario y no es admin */}
      {isLoggedIn && roleUser?.name !== "admin" && (
        <button className="btn btn-secondary">Request Admin Access</button>
      )}
    </div>
  );
}

export default UserInfo;
