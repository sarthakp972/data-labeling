import { useAuth } from "../context/AuthContext";
import { signOutUser } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const joinedDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "N/A";

  const lastLogin = user.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleString("en-IN", {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : "N/A";

  const fields = [
    { label: "Full Name", value: user.displayName || "—", icon: "👤" },
    { label: "Email Address", value: user.email || "—", icon: "📧" },
    { label: "User ID (UID)", value: user.uid, icon: "🔑", mono: true },
    { label: "Account Created", value: joinedDate, icon: "📅" },
    { label: "Last Login", value: lastLogin, icon: "🕐" },
    {
      label: "Email Verified",
      value: user.emailVerified ? "✅ Verified" : "❌ Not Verified",
      icon: "🛡️",
    },
    {
      label: "Login Provider",
      value: user.providerData?.[0]?.providerId === "google.com"
        ? "Google"
        : user.providerData?.[0]?.providerId || "—",
      icon: "🔗",
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* Hero band */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        padding: "48px 0 80px",
      }} />

      <div className="container" style={{ marginTop: -60 }}>
        <div className="row justify-content-center">
          <div className="col-lg-7">

            {/* Profile card */}
            <div className="card border-0 shadow-lg p-4" style={{ borderRadius: 20 }}>

              {/* Avatar + name */}
              <div className="text-center mb-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    style={{
                      width: 96, height: 96, borderRadius: "50%",
                      border: "4px solid white",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{
                    width: 96, height: 96, borderRadius: "50%",
                    background: "linear-gradient(135deg,#3b82f6,#6366f1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 40, color: "white", fontWeight: 700,
                    margin: "0 auto",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  }}>
                    {(user.displayName || user.email || "U")[0].toUpperCase()}
                  </div>
                )}

                <h4 style={{ fontWeight: 800, color: "#0f172a", marginTop: 16, marginBottom: 4 }}>
                  {user.displayName || "User"}
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: 0 }}>
                  {user.email}
                </p>
                <span className="badge mt-2" style={{
                  background: "linear-gradient(135deg,#3b82f6,#6366f1)",
                  fontSize: 12, padding: "5px 12px", borderRadius: 999,
                }}>
                  🔗 Signed in with Google
                </span>
              </div>

              <hr />

              {/* Info fields */}
              <div className="d-flex flex-column gap-3">
                {fields.map((f) => (
                  <div
                    key={f.label}
                    className="d-flex align-items-start gap-3 p-3 rounded-3"
                    style={{ background: "#f8fafc" }}
                  >
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>
                        {f.label}
                      </p>
                      <p style={{
                        fontWeight: 600, color: "#1e293b", marginBottom: 0,
                        fontSize: f.mono ? 12 : "0.95rem",
                        fontFamily: f.mono ? "monospace" : "inherit",
                        wordBreak: "break-all",
                      }}>
                        {f.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              {/* Actions */}
              <div className="d-flex gap-2 justify-content-end">
                <button
                  className="btn btn-outline-danger px-4 rounded-pill"
                  onClick={handleLogout}
                >
                  🚪 Sign Out
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div style={{ height: 60 }} />
    </div>
  );
}
