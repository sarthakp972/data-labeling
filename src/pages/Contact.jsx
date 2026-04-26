const services = [
  "Text data labeling",
  "Image annotation",
  "Audio data labeling",
  "Sentiment classification",
  "Category tagging",
  "Intent recognition for chatbots",
];

const reasons = [
  "Fast response",
  "Reliable data annotation support",
  "Scalable for small and large projects",
  "Manual + AI-assisted labeling expertise",
  "Suitable for startups, researchers, and companies",
];

export default function Contact() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #134e4a 60%, #065f46 100%)",
        color: "white", padding: "80px 0 70px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, left: "20%", width: 400, height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)",
        }} />
        <div className="container position-relative">
          <span style={{
            background: "rgba(52,211,153,0.2)", border: "1px solid rgba(52,211,153,0.4)",
            color: "#6ee7b7", borderRadius: 999, padding: "6px 18px",
            fontSize: 13, fontWeight: 600, display: "inline-block", marginBottom: 20,
          }}>
            📞 Contact Us
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, marginBottom: 16 }}>
            🧠 Need Data Annotation Services?
          </h1>
          <p style={{ color: "#a7f3d0", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto", lineHeight: 1.9 }}>
            If you are looking for skilled Data Annotators for your AI/ML projects, we are here to help.
            Whether it's a small dataset or large-scale AI training data, we ensure high-quality and accurate labeling.
          </p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">

          {/* ── Left: Services + Contact card ── */}
          <div className="col-lg-7">

            {/* Services */}
            <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: 16 }}>
              <h5 style={{ fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>
                ⚡ We Provide Expert Support In
              </h5>
              <div className="row g-2">
                {services.map((s) => (
                  <div key={s} className="col-sm-6">
                    <div className="d-flex align-items-center gap-2 p-2 rounded-3"
                      style={{ background: "#f0fdf4" }}>
                      <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 16 }}>✔</span>
                      <span style={{ color: "#166534", fontWeight: 500, fontSize: "0.9rem" }}>{s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 16 }}>
              <h5 style={{ fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>
                ⚡ Why Contact Us?
              </h5>
              <div className="d-flex flex-column gap-2">
                {reasons.map((r) => (
                  <div key={r} className="d-flex align-items-center gap-2">
                    <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 16 }}>✔</span>
                    <span style={{ color: "#334155", fontWeight: 500 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Contact card ── */}
          <div className="col-lg-5">
            <div
              className="card border-0 shadow-lg p-4 h-100"
              style={{
                borderRadius: 20,
                background: "linear-gradient(160deg, #0f172a 0%, #134e4a 100%)",
                color: "white",
              }}
            >
              {/* Avatar */}
              <div className="text-center mb-4">
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "linear-gradient(135deg,#10b981,#3b82f6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, fontWeight: 800, margin: "0 auto 12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}>
                  S
                </div>
                <h5 style={{ fontWeight: 800, marginBottom: 4 }}>Sarthak Patwa</h5>
                <p style={{ color: "#6ee7b7", fontSize: 13, marginBottom: 0 }}>
                  Data Annotation Expert
                </p>
              </div>

              <hr style={{ borderColor: "rgba(255,255,255,0.15)" }} />

              {/* Contact details */}
              <div className="d-flex flex-column gap-3 mb-4">
                <a
                  href="mailto:sarthakpatwa972@gmail.com"
                  className="d-flex align-items-center gap-3 text-decoration-none"
                  style={{
                    background: "rgba(255,255,255,0.08)", borderRadius: 12,
                    padding: "12px 16px", color: "white", transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                >
                  <span style={{ fontSize: 24 }}>📧</span>
                  <div>
                    <p style={{ fontSize: 11, color: "#6ee7b7", marginBottom: 2, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>Email</p>
                    <p style={{ marginBottom: 0, fontWeight: 600, fontSize: "0.9rem" }}>sarthakpatwa972@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/917649062706"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-3 text-decoration-none"
                  style={{
                    background: "rgba(255,255,255,0.08)", borderRadius: 12,
                    padding: "12px 16px", color: "white", transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                >
                  <span style={{ fontSize: 24 }}>📱</span>
                  <div>
                    <p style={{ fontSize: 11, color: "#6ee7b7", marginBottom: 2, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>WhatsApp</p>
                    <p style={{ marginBottom: 0, fontWeight: 600, fontSize: "0.9rem" }}>+91 76490 62706</p>
                  </div>
                </a>
              </div>

              {/* CTA buttons */}
              <div className="d-flex flex-column gap-2">
                <a
                  href="mailto:sarthakpatwa972@gmail.com"
                  className="btn btn-light fw-semibold rounded-pill"
                  style={{ color: "#134e4a" }}
                >
                  📧 Send Email
                </a>
                <a
                  href="https://wa.me/917649062706"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn fw-semibold rounded-pill"
                  style={{ background: "#25d366", color: "white", border: "none" }}
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── CTA Banner ── */}
        <div
          className="card border-0 shadow-sm mt-4 p-4 text-center"
          style={{
            borderRadius: 20,
            background: "linear-gradient(135deg, #ecfdf5, #eff6ff)",
          }}
        >
          <h4 style={{ fontWeight: 800, color: "#065f46", marginBottom: 12 }}>
            🚀 Let's Build Better AI Together
          </h4>
          <p style={{ color: "#475569", maxWidth: 560, margin: "0 auto 20px", lineHeight: 1.8 }}>
            Clean and accurate data is the foundation of every intelligent system.
            If you need professional Data Annotators, feel free to reach out anytime.
          </p>
          <p style={{ fontWeight: 700, color: "#0f172a", marginBottom: 0 }}>
            👉 We are ready to work with you on your next AI project.
          </p>
        </div>
      </div>

      {/* Footer tagline */}
      <div style={{ background: "#0f172a", color: "#64748b", textAlign: "center", padding: "20px 0", fontSize: 13 }}>
        "From raw text to AI-ready data — in minutes, not hours." · DataLabeler
      </div>
    </div>
  );
}
