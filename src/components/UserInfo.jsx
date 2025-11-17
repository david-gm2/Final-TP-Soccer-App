import { IconSesionOut } from "../../public/icons/IconSidebar";
import { IconDefaultUser } from "../../public/icons/IconsPlayer";

function UserInfo({ user, roleUser, onSignOut }) {
  return (
    <div className="sidebar-bottom">
      <div className="user-info">
        {(
          <img
            className="user-avatar"
            src={user.avatar}
            alt={`${user.name} avatar`}
          />
        ) && <IconDefaultUser width="24" height="24" className="user-avatar" />}
        <div className="user-text">
          <p className="user-name">{user.name}</p>
          <p className="user-email">{user.email}</p>
        </div>

        <button
          className="user-switch-btn"
          onClick={onSignOut}
          aria-label="Sign out"
        >
          <IconSesionOut />
        </button>
      </div>

      {roleUser.name !== "admin" && (
        <button className="request-admin-access">Request Admin Access</button>
      )}
    </div>
  );
}

export default UserInfo;
