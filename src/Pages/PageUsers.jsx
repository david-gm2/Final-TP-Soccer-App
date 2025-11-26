import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";

import "../styles/UsersPage.css";

const ADMIN_ROLE_ID = 1;

const normalizeUsers = (list = []) =>
  list.map((user) => ({
    id: user.id ?? user.user_id ?? user._id,
    name: user.name ?? user.userName ?? user.username ?? "Unknown",
    email: user.email ?? "No email",
    roles: user.roles ?? [],
  }));

const isAdmin = (user) =>
  Array.isArray(user?.roles)
    ? user.roles.some(
        (role) =>
          role?.roleName?.toLowerCase() === "admin" ||
          (typeof role === "string" && role.toLowerCase() === "admin")
      )
    : false;

function UsersPage() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    userId: null,
  });
  const [showAdmins, setShowAdmins] = useState(true);
  const [showUsers, setShowUsers] = useState(true);

  const admins = useMemo(() => users.filter((u) => isAdmin(u)), [users]);
  const regularUsers = useMemo(() => users.filter((u) => !isAdmin(u)), [users]);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BACKEND_URL}/users-roles/users/1`, {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        });
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
        const data = await res.json();
        if (mounted) setUsers(normalizeUsers(data));
      } catch (err) {
        console.error("PageUsers: unable to fetch users", err);
        if (mounted) {
          setError("Unable to load users. Showing sample data.");
          setUsers(
            normalizeUsers([
              {
                id: "demo-1",
                name: "Demo User",
                email: "demo@example.com",
                roles: [{ roleName: "admin" }],
              },
              {
                id: "demo-2",
                name: "Guest User",
                email: "guest@example.com",
                roles: [],
              },
            ])
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, [accessToken]);

  const toggleAdminLocal = (userId, makeAdmin) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const nextRoles = Array.isArray(u.roles) ? [...u.roles] : [];
        const hasAdmin = isAdmin(u);
        if (makeAdmin && !hasAdmin) {
          nextRoles.push({ roleName: "admin" });
        }
        if (!makeAdmin && hasAdmin) {
          return {
            ...u,
            roles: nextRoles.filter(
              (r) =>
                r?.roleName?.toLowerCase() !== "admin" &&
                !(typeof r === "string" && r.toLowerCase() === "admin")
            ),
          };
        }
        return { ...u, roles: nextRoles };
      })
    );
  };

  const updateAdmin = async (userId, makeAdmin) => {
    toggleAdminLocal(userId, makeAdmin);
    try {
      await fetch(`${API_BACKEND_URL}/user-roles/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({
          roles_ids: makeAdmin ? [ADMIN_ROLE_ID] : [],
        }),
      });
    } catch (err) {
      console.error("PageUsers: failed to update admin", err);
      setError("Could not update role. Please try again.");
    }
  };

  const handleToggle = (user) => {
    const makeAdmin = !isAdmin(user);
    if (makeAdmin) {
      setConfirmModal({ open: true, userId: user.id });
    } else {
      updateAdmin(user.id, false);
    }
  };

  const confirmGrant = () => {
    if (!confirmModal.userId) return;
    updateAdmin(confirmModal.userId, true);
    setConfirmModal({ open: false, userId: null });
  };

  const closeModal = () => setConfirmModal({ open: false, userId: null });

  return (
    <>
      <Header title="Users" subtitle="Manage roles and admin access" />

      <main className="users-page">
        {error && <p className="users-error">{error}</p>}
        {loading && <p className="users-loading">Loading users...</p>}

        <section className="users-section">
          <button
            type="button"
            className="users-section__header"
            onClick={() => setShowAdmins((prev) => !prev)}
          >
            <div className="users-section__title">
              <span className={`arrow ${showAdmins ? "open" : ""}`}>▸</span>
              <h2>Admins</h2>
            </div>
            <span className="pill-count">{admins.length}</span>
          </button>

          <div
            className={`users-list-wrapper ${showAdmins ? "open" : "closed"}`}
            aria-hidden={!showAdmins}
          >
            <div className="users-list-panel">
              <div className="users-grid">
                {admins.map((user) => (
                  <article className="user-card" key={user.id}>
                    <div className="user-info">
                      <div className="user-avatar">{user.name[0] ?? "U"}</div>
                      <div>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="user-roles">
                      <span className="badge badge-admin">Admin</span>
                    </div>
                    <div className="user-actions">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleToggle(user)}
                      >
                        Remove admin
                      </button>
                    </div>
                  </article>
                ))}
                {!admins.length && !loading && (
                  <p className="users-empty">No admins yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="users-section">
          <button
            type="button"
            className="users-section__header"
            onClick={() => setShowUsers((prev) => !prev)}
          >
            <div className="users-section__title">
              <span className={`arrow ${showUsers ? "open" : ""}`}>▸</span>
              <h2>Users</h2>
            </div>
            <span className="pill-count">{regularUsers.length}</span>
          </button>

          <div
            className={`users-list-wrapper ${showUsers ? "open" : "closed"}`}
            aria-hidden={!showUsers}
          >
            <div className="users-list-panel">
              <div className="users-grid">
                {regularUsers.map((user) => (
                  <article className="user-card" key={user.id}>
                    <div className="user-info">
                      <div className="user-avatar">{user.name[0] ?? "U"}</div>
                      <div>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="user-actions">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleToggle(user)}
                      >
                        Give admin
                      </button>
                    </div>
                  </article>
                ))}
                {!regularUsers.length && !loading && (
                  <p className="users-empty">No regular users.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {confirmModal.open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal users-modal">
            <h3>Grant admin access</h3>
            <p>
              Are you sure you want to grant admin permissions to this user?
              This action gives full access.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirmGrant}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersPage;
