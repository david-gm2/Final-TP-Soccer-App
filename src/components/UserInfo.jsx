import { IconSignOut } from "../icons/IconSidebar.jsx";
import { IconDefaultUser } from "../icons/IconsPlayer.jsx";
import { useAuth } from "../hooks/useAuth.js";

function UserInfo({ user: userProp, roleUser, onSignOut }) {
  const { user: authUser, signOut } = useAuth() ?? {};
  const user = userProp ?? authUser;
  const isLoggedIn = Boolean(user);

  const displayName = user?.name || user?.user_name || "Guest";
  const displayEmail = user?.email || "";
  const avatarSrc = user?.avatar || null;

  const handleSignOut = () => {
    if (typeof onSignOut === "function") {
      onSignOut();
    } else if (typeof signOut === "function") {
      signOut();
    }
  };

  return (
    <div className="sidebar-bottom">
      <div className="user-info">
        {avatarSrc ? (
          <img
            className="user-avatar"
            src={avatarSrc}
            alt={`${displayName} avatar`}
          />
        ) : (
          <IconDefaultUser width="40" height="40" className="user-avatar" />
        )}

        <div className="user-text">
          <p className="user-name">{displayName}</p>
          {displayEmail && <p className="user-email">{displayEmail}</p>}
        </div>

        {isLoggedIn && (
          <button
            type="button"
            className="user-switch-btn"
            onClick={handleSignOut}
            aria-label="Sign out"
          >
            <IconSignOut />
          </button>
        )}
      </div>

      {isLoggedIn && roleUser?.name?.toLowerCase() !== "admin" && (
        <button type="button" className="btn btn-secondary">
          Request admin access
        </button>
      )}
    </div>
  );
}

export default UserInfo;
