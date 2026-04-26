import { useState } from "react";
import FileUpload from "../components/DataLabeling/Upload/FileUpload";
import FileList from "../components/DataLabeling/FileManager/FileList";

function DataLabeling() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleFileSaved = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        padding: "40px 0 32px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div className="container">
          <div className="d-flex align-items-center gap-3">
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg,#3b82f6,#6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
            }}>
              🏷️
            </div>
            <div>
              <h1 style={{
                fontWeight: 800, fontSize: "1.6rem", color: "white",
                marginBottom: 2, lineHeight: 1.2,
              }}>
                Data Labeling
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "0.87rem", marginBottom: 0 }}>
                Upload datasets, label with AI or manually, and export clean data instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="container py-4">
        <div className="row g-4 align-items-start">

          {/* Upload panel */}
          <div className="col-lg-5">
            <div style={{
              background: "white",
              borderRadius: 16,
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}>
              {/* Panel header */}
              <div style={{
                padding: "14px 20px",
                borderBottom: "1px solid #f1f5f9",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "linear-gradient(135deg,#10b981,#0d9488)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                }}>⬆️</span>
                <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>
                  Upload Dataset
                </span>
              </div>
              <div style={{ padding: "20px" }}>
                <FileUpload onFileSaved={handleFileSaved} />
              </div>
            </div>
          </div>

          {/* File list panel */}
          <div className="col-lg-7">
            <div style={{
              background: "white",
              borderRadius: 16,
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}>
              {/* Panel header */}
              <div style={{
                padding: "14px 20px",
                borderBottom: "1px solid #f1f5f9",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "linear-gradient(135deg,#3b82f6,#6366f1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                }}>📂</span>
                <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>
                  Your Files
                </span>
              </div>
              <FileList refreshTrigger={refreshTrigger} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default DataLabeling;
