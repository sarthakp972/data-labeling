const howItWorks = [
  { step: "01", icon: "⬆️", title: "Upload Data", desc: "Upload your dataset in CSV or JSON format." },
  { step: "02", icon: "🏷️", title: "Label Data", desc: "Add labels manually or use AI-assisted suggestions." },
  { step: "03", icon: "💾", title: "Save Progress", desc: "Your work is automatically saved in Data Base." },
  { step: "04", icon: "▶️", title: "Continue Anytime", desc: "Resume your labeling whenever you want." },
  { step: "05", icon: "📥", title: "Export Dataset", desc: "Download final labeled data in CSV or JSON format." },
];

const users = [
  { icon: "🤖", title: "AI / ML Developers", desc: "Prepare training datasets for models." },
  { icon: "📊", title: "Data Scientists", desc: "Data preprocessing and analysis." },
  { icon: "💬", title: "Chatbot Developers", desc: "Label intents and improve NLP systems." },
  { icon: "🏢", title: "Tech Companies", desc: "Sentiment analysis, spam detection, automation." },
  { icon: "🎓", title: "Students & Researchers", desc: "Academic projects and AI experiments." },
  { icon: "🧑‍💻", title: "Freelancers", desc: "Data labeling jobs and freelance AI projects." },
  { icon: "📱", title: "Product Teams", desc: "Recommendation systems and user insights." },
];

const future = [
  "Advanced AI labeling models",
  "Real-time collaboration",
  "Dataset marketplace",
  "Auto-cleaning & preprocessing tools",
];

export default function About() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e40af 100%)",
        color: "white", padding: "90px 0 70px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-60px", right: "15%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(165,180,252,0.12) 0%, transparent 70%)",
        }} />
        <div className="container position-relative">
          <span style={{
            background: "rgba(165,180,252,0.2)", border: "1px solid rgba(165,180,252,0.4)",
            color: "#c7d2fe", borderRadius: 999, padding: "6px 18px",
            fontSize: 13, fontWeight: 600, display: "inline-block", marginBottom: 20,
          }}>
            📖 About Us
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, marginBottom: 20 }}>
            🧠 About Our Platform
          </h1>
          <p style={{ color: "#c7d2fe", fontSize: "1.1rem", maxWidth: 640, margin: "0 auto", lineHeight: 1.9 }}>
            Our Data Labeling Platform is designed to simplify the process of preparing text datasets for
            Artificial Intelligence and Machine Learning models. We bridge the gap between raw data and
            intelligent systems by making labeling fast, structured, and scalable.
          </p>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section style={{ background: "#f8fafc", padding: "72px 0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>🎯 Our Mission</h2>
              <p style={{ color: "#475569", fontSize: "1.1rem", lineHeight: 1.9, marginBottom: 16 }}>
                To make data labeling <strong>simple, fast, and accessible</strong> for everyone — from students
                to AI developers to enterprises.
              </p>
              <p style={{
                color: "#6366f1", fontWeight: 700, fontSize: "1.2rem",
                border: "2px solid #e0e7ff", borderRadius: 12, padding: "16px 32px",
                display: "inline-block", background: "#eef2ff",
              }}>
                "We believe high-quality AI starts with high-quality data."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="container">
          <h2 className="text-center mb-2" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>⚙️ How It Works</h2>
          <p className="text-center text-secondary mb-5">5 simple steps to AI-ready data</p>
          <div className="row g-4 justify-content-center">
            {howItWorks.map((item) => (
              <div key={item.step} className="col-sm-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100 p-4" style={{ borderRadius: 16 }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span style={{
                      background: "linear-gradient(135deg,#6366f1,#3b82f6)",
                      color: "white", borderRadius: 10, width: 44, height: 44,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 14, flexShrink: 0,
                    }}>
                      {item.step}
                    </span>
                    <span style={{ fontSize: 28 }}>{item.icon}</span>
                  </div>
                  <h6 style={{ fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{item.title}</h6>
                  <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data Security ────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", background: "#f0fdf4" }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5 text-center" style={{ fontSize: 100 }}>🔐</div>
            <div className="col-lg-7">
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>🔐 Data Security</h2>
              <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: 20 }}>
                We use Secure  Authentication and Secure DB  to ensure your data is always safe and isolated.
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {["User-wise data isolation", "Secure cloud storage", "No data conflict between users", "Safe save and delete operations"].map((item) => (
                  <li key={item} className="d-flex align-items-center gap-2" style={{ color: "#166534", fontWeight: 500 }}>
                    <span style={{ fontWeight: 700, fontSize: 18 }}>✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who Can Use ──────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <div className="container">
          <h2 className="text-center mb-2" style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>👥 Who Can Use This Platform?</h2>
          <p className="text-center text-secondary mb-5">Built for everyone working with text data</p>
          <div className="row g-3">
            {users.map((u) => (
              <div key={u.title} className="col-sm-6 col-lg-3">
                <div
                  className="card border-0 shadow-sm p-3 h-100"
                  style={{ borderRadius: 14, transition: "transform 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{u.icon}</div>
                  <h6 style={{ fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{u.title}</h6>
                  <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: 0 }}>{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why We Built This ────────────────────────────────────────────── */}
      <section style={{ padding: "72px 0", background: "#faf5ff" }}>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>💡 Why We Built This</h2>
              <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: 20 }}>Traditional labeling systems are:</p>
              {["Slow", "Manual heavy", "Difficult to scale"].map((t) => (
                <p key={t} className="d-flex align-items-center gap-2 mb-2" style={{ color: "#b91c1c", fontWeight: 500 }}>
                  <span>✖</span> {t}
                </p>
              ))}
              <p style={{ color: "#475569", lineHeight: 1.8, margin: "20px 0 12px" }}>We built this to make the process:</p>
              {["Faster", "Smarter (AI-assisted)", "Collaborative-ready", "Developer-friendly"].map((t) => (
                <p key={t} className="d-flex align-items-center gap-2 mb-2" style={{ color: "#15803d", fontWeight: 500 }}>
                  <span>✔</span> {t}
                </p>
              ))}
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow p-4" style={{ borderRadius: 20, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "white" }}>
                <h4 style={{ fontWeight: 800, marginBottom: 20 }}>🚀 Future Vision</h4>
                <p style={{ color: "#e0e7ff", marginBottom: 20, lineHeight: 1.8 }}>
                  We aim to evolve this platform into a full <strong>AI Data Management Suite</strong>, including:
                </p>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {future.map((f) => (
                    <li key={f} className="d-flex align-items-center gap-2" style={{ color: "#e0e7ff" }}>
                      <span style={{ color: "#a5f3fc" }}>→</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer tagline ────────────────────────────────────────────────── */}
      <div style={{ background: "#0f172a", color: "#64748b", textAlign: "center", padding: "20px 0", fontSize: 13 }}>
        "From raw text to AI-ready data — in minutes, not hours." · DataLabeler
      </div>

    </div>
  );
}
