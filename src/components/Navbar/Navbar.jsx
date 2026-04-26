import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signInWithGoogle } from "../../firebase/auth";

function Navbar() {
  const { user, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on any link click (mobile UX)
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    fontWeight: 600,
    fontSize: "0.92rem",
    padding: "6px 4px",
    borderBottom: isActive(path) ? "2px solid #60a5fa" : "2px solid transparent",
    color: isActive(path) ? "#60a5fa" : "rgba(255,255,255,0.85)",
    textDecoration: "none",
    transition: "color 0.2s, border-color 0.2s",
    whiteSpace: "nowrap",
  });

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">

          {/* ── Logo ── */}
          <Link
            to="/"
            onClick={closeMenu}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: "white", fontSize: 16, flexShrink: 0,
            }}>
              A
            </div>
            <span style={{
              fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.3px",
              background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              AnnotaAI
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            <Link to="/" style={navLinkStyle("/")} onMouseEnter={(e) => { if (!isActive("/")) e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { if (!isActive("/")) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>Home</Link>
            <Link to="/about" style={navLinkStyle("/about")} onMouseEnter={(e) => { if (!isActive("/about")) e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { if (!isActive("/about")) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>About</Link>
            <Link to="/contact" style={navLinkStyle("/contact")} onMouseEnter={(e) => { if (!isActive("/contact")) e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { if (!isActive("/contact")) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>Contact</Link>

            {user && (
              <Link to="/label" style={navLinkStyle("/label")} onMouseEnter={(e) => { if (!isActive("/label")) e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { if (!isActive("/label")) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}>
                Data Labeling
              </Link>
            )}

            {!loading && (
              user ? (
                <div className="d-flex align-items-center gap-2 ms-2">
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profile"
                        referrerPolicy="no-referrer"
                        style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #60a5fa", objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: "linear-gradient(135deg,#3b82f6,#6366f1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "white", fontWeight: 700, fontSize: 14,
                      }}>
                        {(user.displayName || user.email || "U")[0].toUpperCase()}
                      </div>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="btn btn-sm rounded-pill"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)", fontSize: "0.82rem", fontWeight: 600 }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="btn btn-sm rounded-pill fw-semibold ms-2"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "white", border: "none", padding: "6px 20px", boxShadow: "0 2px 10px rgba(99,102,241,0.4)" }}
                >
                  Login
                </button>
              )
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="d-lg-none btn p-0"
            onClick={() => setIsOpen((v) => !v)}
            style={{ background: "none", border: "none", color: "white", fontSize: 24, lineHeight: 1 }}
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {isOpen && (
          <div
            className="d-lg-none pb-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="d-flex flex-column pt-3 gap-1">
              {[
                { to: "/", label: "🏠 Home" },
                { to: "/about", label: "📖 About" },
                { to: "/contact", label: "📞 Contact" },
                ...(user ? [{ to: "/label", label: "🏷️ Data Labeling" }] : []),
                ...(user ? [{ to: "/profile", label: "👤 Profile" }] : []),
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  style={{
                    color: isActive(to) ? "#60a5fa" : "rgba(255,255,255,0.85)",
                    fontWeight: isActive(to) ? 700 : 500,
                    textDecoration: "none",
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: isActive(to) ? "rgba(96,165,250,0.12)" : "transparent",
                    fontSize: "0.95rem",
                    display: "block",
                  }}
                >
                  {label}
                </Link>
              ))}

              <div className="mt-2 px-2">
                {!loading && (
                  user ? (
                    <button
                      onClick={() => { logout(); closeMenu(); }}
                      className="btn w-100 rounded-pill fw-semibold"
                      style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)" }}
                    >
                      🚪 Sign Out
                    </button>
                  ) : (
                    <button
                      onClick={() => { signInWithGoogle(); closeMenu(); }}
                      className="btn w-100 rounded-pill fw-semibold"
                      style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "white", border: "none", boxShadow: "0 2px 10px rgba(99,102,241,0.4)" }}
                    >
                      Login with Google
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;