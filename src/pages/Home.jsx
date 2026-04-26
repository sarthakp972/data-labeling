import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithGoogle } from "../firebase/auth";

const features = [
  { icon: "🗂️", title: "Smart File Management", desc: "Each user can manage multiple datasets securely in an isolated cloud workspace." },
  { icon: "🧠", title: "AI + Manual Labeling", desc: "Combine automation with human accuracy. AI suggestions speed up your workflow instantly." },
  { icon: "💾", title: "Save Anytime", desc: "Work in sessions — continue your labeling later without any data loss." },
  { icon: "🔄", title: "Export Flexibility", desc: "Download your labeled datasets in CSV or JSON format with a single click." },
  { icon: "🔐", title: "Secure User Data", desc: "Each user has isolated storage powered by Firebase Authentication and Firestore." },
  { icon: "⚡", title: "Fast & Scalable", desc: "Built to handle large datasets with minimal effort, even for first-time users." },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    const loggedInUser = await signInWithGoogle();
    if (loggedInUser) navigate("/label");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c81 100%)",
          color: "white",
          padding: "100px 0 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow blobs */}
        <div style={{
          position: "absolute", top: "-80px", left: "20%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", right: "10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container position-relative">
          <span style={{
            background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.4)",
            color: "#93c5fd", borderRadius: 999, padding: "6px 18px",
            fontSize: 13, fontWeight: 600, letterSpacing: 1,
            display: "inline-block", marginBottom: 24,
          }}>
            🚀 Data Labeling Platform
          </span>

          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
            🧠 Build Smarter AI with<br />
            <span style={{
              background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Clean Labeled Data
            </span>
          </h1>

          <p style={{ fontSize: "1.15rem", color: "#cbd5e1", maxWidth: 620, margin: "0 auto 36px", lineHeight: 1.8 }}>
            Turn raw text into structured, AI-ready datasets using our powerful Data Labeling Platform.
            Upload CSV / JSON, label manually or with AI assistance, and export instantly.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            {user ? (
              <Link to="/label" className="btn btn-primary btn-lg px-5 rounded-pill fw-semibold"
                style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", border: "none", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
                Go to Dashboard →
              </Link>
            ) : (
              <button onClick={handleGetStarted} className="btn btn-primary btn-lg px-5 rounded-pill fw-semibold"
                style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", border: "none", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
                Get Started Free →
              </button>
            )}
            <Link to="/about" className="btn btn-outline-light btn-lg px-5 rounded-pill fw-semibold">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────────────────── */}
      <section style={{ background: "#f8fafc", padding: "72px 0" }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>
                ⚡ What Our Platform Does
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 24 }}>
                We help you convert messy text data into high-quality labeled datasets ready for Machine Learning and AI training.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Upload CSV / JSON datasets",
                  "Label text manually or using AI assistance",
                  "Save progress anytime and continue later",
                  "Manage multiple files per user",
                  "Export data in CSV or JSON format",
                ].map((item) => (
                  <li key={item} className="d-flex align-items-center gap-2" style={{ color: "#334155", fontWeight: 500 }}>
                    <span style={{ color: "#22c55e", fontWeight: 700, fontSize: 18 }}>✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              {/* Visual comparison card */}
              <div className="row g-3">
                <div className="col-6">
                  <div className="card h-100 border-0 shadow-sm p-3" style={{ background: "#fff1f2" }}>
                    <p className="fw-bold text-danger mb-2">❌ Traditional Way</p>
                    {["Slow", "Time-consuming", "Prone to human error", "Not scalable"].map((t) => (
                      <p key={t} className="mb-1 small text-secondary">✖ {t}</p>
                    ))}
                  </div>
                </div>
                <div className="col-6">
                  <div className="card h-100 border-0 shadow-sm p-3" style={{ background: "#f0fdf4" }}>
                    <p className="fw-bold text-success mb-2">✅ Our Platform</p>
                    {["Fast & efficient", "AI-assisted", "Firebase secured", "Scales easily"].map((t) => (
                      <p key={t} className="mb-1 small text-secondary">✔ {t}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Features ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a" }}>📦 Key Features</h2>
            <p style={{ color: "#64748b", maxWidth: 500, margin: "0 auto" }}>
              Everything you need to build clean, structured, AI-ready datasets.
            </p>
          </div>
          <div className="row g-4">
            {features.map((f) => (
              <div key={f.title} className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm p-4"
                  style={{
                    borderRadius: 16, transition: "transform 0.2s, box-shadow 0.2s", cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
                  <h5 style={{ fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{f.title}</h5>
                  <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #1e40af, #7c3aed)",
        color: "white", padding: "80px 0", textAlign: "center",
      }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 12 }}>🚀 Get Started Today</h2>
          <p style={{ color: "#ddd6fe", fontSize: "1.1rem", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8 }}>
            Upload your dataset, start labeling, and build AI-ready data in minutes.<br />
            👉 No complexity. No setup headache. Just pure productivity.
          </p>
          {user ? (
            <Link to="/label" className="btn btn-light btn-lg px-5 rounded-pill fw-bold" style={{ color: "#1e40af" }}>
              Open Dashboard →
            </Link>
          ) : (
            <button onClick={handleGetStarted} className="btn btn-light btn-lg px-5 rounded-pill fw-bold" style={{ color: "#1e40af" }}>
              Start Labeling Free →
            </button>
          )}
        </div>
      </section>

      {/* ── Footer tagline ────────────────────────────────────────────────── */}
      <div style={{ background: "#0f172a", color: "#64748b", textAlign: "center", padding: "20px 0", fontSize: 13 }}>
        "From raw text to AI-ready data — in minutes, not hours." · DataLabeler
      </div>

    </div>
  );
}
