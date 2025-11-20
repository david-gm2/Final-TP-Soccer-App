import { IconSesionOut } from "../../public/icons/IconSidebar";
import { IconDefaultUser } from "../../public/icons/IconsPlayer";
import { useAuth } from "../hooks/useAuth";

function UserInfo() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="sidebar-bottom">
      <div className="user-info">
        {user ? (
          <img
            className="user-avatar"
            src={user.avatar}
            alt={`${user} avatar`}
          />
        ) : (
          <IconDefaultUser width="24" height="24" className="user-avatar" />
        )}
        <div className="user-text">
          <p className="user-name">{user.userName}</p>
          <p className="user-email">{user.email}</p>
        </div>

        <button
          className="user-switch-btn"
          onClick={() => logout()}
          aria-label="Sign out"
        >
          <IconSesionOut />
        </button>
      </div>

      {!isAdmin && (
        <button className="request-admin-access">Request Admin Access</button>
      )}
    </div>
  );
}

export default UserInfo;
