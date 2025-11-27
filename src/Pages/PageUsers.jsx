import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header.jsx";
import UserCard from "../components/UserCard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { API_BACKEND_URL } from "../constants/API_CONSTANTS.js";
import { authFetch } from "../utils/authFetch.js";
import { useURLSearch } from "../hooks/useURLSearch.js";

import "../styles/UsersPage.css";

const ADMIN_ROLE_ID = 2;

const normalizeUsers = (list = []) =>
  list.map((user) => ({
    id: user.userId ?? user.user_id ?? user._id,
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
  const { value: search, setValue: setSearch } = useURLSearch("q");

  const [users, setUsers] = useState([]);
  const [fallbackAdmins, setFallbackAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // MODAL STATE → ahora también guarda la acción
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    userId: null,
    makeAdmin: null,
  });

  const [showAdmins, setShowAdmins] = useState(true);
  const [showUsers, setShowUsers] = useState(true);

  const matchesSearch = (user) => {
    const query = search?.trim().toLowerCase();
    if (!query) return true;
    const text = `${user.name ?? ""} ${user.email ?? ""}`.toLowerCase();
    return text.includes(query);
  };

  const filteredUsers = useMemo(
    () => users.filter(matchesSearch),
    [users, search]
  );
  const filteredFallbackAdmins = useMemo(
    () => fallbackAdmins.filter(matchesSearch),
    [fallbackAdmins, search]
  );

  const admins = useMemo(
    () => filteredUsers.filter((u) => isAdmin(u)),
    [filteredUsers]
  );
  const regularUsers = useMemo(
    () => filteredUsers.filter((u) => !isAdmin(u)),
    [filteredUsers]
  );

  const [refreshCount, setRefreshCount] = useState(0);

  const [isProcesing, setIsProcessing] = useState(false);

  // Fetch users
  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const [resRole1, resRole2] = await Promise.all([
          authFetch(
            `${API_BACKEND_URL}/users-roles/users/1`,
            undefined,
            accessToken
          ),
          authFetch(
            `${API_BACKEND_URL}/users-roles/users/2`,
            undefined,
            accessToken
          ),
        ]);

        if (!resRole1.ok) throw new Error("Failed fetching role 1 users");
        if (!resRole2.ok) throw new Error("Failed fetching role 2 users");

        const dataRole1 = await resRole1.json();
        const dataRole2 = await resRole2.json();

        if (!mounted) {
          console.log("monted=true");
          return;
        }

        setUsers(normalizeUsers(dataRole1));
        setFallbackAdmins(normalizeUsers(dataRole2));
      } catch (err) {
        console.error("PageUsers: unable to fetch users", err);

        if (mounted) {
          setError("Unable to load users. Showing sample data.");
          setUsers(
            normalizeUsers([
              {
                id: "demo-1",
                name: "Demo Admin",
                email: "demo-admin@example.com",
                roles: [{ roleName: "admin" }],
              },
              {
                id: "demo-2",
                name: "Demo User",
                email: "demo-user@example.com",
                roles: [],
              },
            ])
          );
          setFallbackAdmins([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      mounted = false;
    };
  }, [accessToken, refreshCount]);

  // LOCAL update
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

  // API update
  const updateAdmin = async (userId, makeAdmin) => {
    toggleAdminLocal(userId, makeAdmin);

    try {
      await authFetch(
        `${API_BACKEND_URL}/users-roles/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roles_ids: makeAdmin ? [2] : [1],
          }),
        },
        accessToken
      );
    } catch (err) {
      console.error("PageUsers: failed to update admin", err);
      setError("Could not update role. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // HANDLE TOGGLE → ahora SIEMPRE abre modal
  const handleToggle = (user, isAdmin) => {
    setConfirmModal({
      open: true,
      userId: user.id,
      makeAdmin: !isAdmin,
    });
  };

  // Confirmación del modal
  const confirmGrant = async () => {
    if (!confirmModal.userId) return;

    await updateAdmin(confirmModal.userId, confirmModal.makeAdmin);

    setRefreshCount((c) => c + 1);

    setConfirmModal({ open: false, userId: null, makeAdmin: null });
  };

  const closeModal = () =>
    setConfirmModal({ open: false, userId: null, makeAdmin: null });
  console.log(regularUsers);
  return (
    <>
      <Header title="Users" subtitle="Manage roles and admin access" />

      <main className="users-page">
        <div className="search-player-box users-search">
          <label htmlFor="users-search">
            <span aria-hidden="true"></span>
          </label>
          <input
            type="search"
            id="users-search"
            placeholder="Search by name or email..."
            value={search}
            aria-label="Search users"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && <p className="users-error">{error}</p>}
        {loading && <p className="users-loading">Loading users...</p>}

        {/* ADMIN SECTION */}
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
            <div className="users-grid">
              {admins.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isAdmin={true}
                  onToggle={() => handleToggle(user, true)}
                />
              ))}

              {!admins.length && !loading && (
                <>
                  {filteredFallbackAdmins.length ? (
                    filteredFallbackAdmins.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        isAdmin={true}
                        onToggle={() => handleToggle(user, true)}
                      />
                    ))
                  ) : (
                    <p className="users-empty">No admins yet.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* USERS SECTION */}
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
            <div className="users-grid">
              {regularUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isAdmin={false}
                  onToggle={() => handleToggle(user, false)}
                />
              ))}

              {!regularUsers.length && !loading && (
                <p className="users-empty">No regular users.</p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* MODAL */}
      {confirmModal.open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal users-modal">
            <h3>
              {confirmModal.makeAdmin
                ? "Grant admin access"
                : "Remove admin access"}
            </h3>

            <p>
              {confirmModal.makeAdmin
                ? "Are you sure you want to grant admin permissions to this user?"
                : "Are you sure you want to remove admin permissions from this user?"}
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
                disabled={isProcesing}
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

