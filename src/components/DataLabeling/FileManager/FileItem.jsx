import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getFileById } from "../../../services/firestoreService";

function FileItem({ file, onDelete, onRename }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(file.fileName || file.name || "Untitled");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const navigate = useNavigate();

  const handleRename = () => {
    if (!newName.trim()) return;
    onRename(file.id, newName.trim());
    setIsEditing(false);
  };

  // ── Download ──────────────────────────────────────────────────────────────
  const triggerDownload = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = async (format) => {
    setShowDownloadMenu(false);
    setDownloading(true);
    try {
      const fileDoc = await getFileById(user.uid, file.id);
      if (!fileDoc) throw new Error("File not found");
      const fields = fileDoc.fields ?? [];
      const baseName = fileDoc.fileName || "download";
      if (format === "json") {
        const jsonRows = fields.map((f) => ({
          id: f.id,
          [fileDoc.labelColumn || "text"]: f.value,
          label: f.label,
        }));
        triggerDownload(JSON.stringify(jsonRows, null, 2), `${baseName}.json`, "application/json");
      } else {
        const col = fileDoc.labelColumn || "text";
        const header = `id,${col},label`;
        const rows = fields.map(
          (f) => `${f.id},"${String(f.value).replace(/"/g, '""')}","${String(f.label).replace(/"/g, '""')}"`
        );
        triggerDownload([header, ...rows].join("\n"), `${baseName}.csv`, "text/csv");
      }
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // ── Review ────────────────────────────────────────────────────────────────
  const handleReview = async () => {
    setShowReview(true);
    setReviewData(null);
    setReviewLoading(true);
    try {
      const fileDoc = await getFileById(user.uid, file.id);
      setReviewData(fileDoc);
    } catch (err) {
      console.error("Review fetch failed:", err);
    } finally {
      setReviewLoading(false);
    }
  };

  const displayName = file.fileName || file.name || "Untitled";
  const createdAt = file.createdAt?.toDate?.()?.toLocaleDateString() ?? "";
  const labeled = reviewData?.fields?.filter((f) => f.label).length ?? 0;
  const total = reviewData?.fields?.length ?? 0;

  return (
    <>
      {/* ── Card row ──────────────────────────────────────────────────────── */}
      <div className="border-bottom py-3">

        {/* File info + rename input */}
        <div className="mb-2">
          {isEditing ? (
            <div className="d-flex gap-2" style={{ maxWidth: 320 }}>
              <input
                className="form-control form-control-sm"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleRename(); }}
                autoFocus
              />
              <button className="btn btn-sm btn-success" onClick={handleRename}>Save</button>
            </div>
          ) : (
            <div>
              <span className="fw-semibold">{displayName}</span>
              {createdAt && <small className="text-muted ms-2">({createdAt})</small>}
              {file.labelColumn && (
                <small className="text-muted ms-2 d-none d-sm-inline">
                  — column: <em>{file.labelColumn}</em>
                </small>
              )}
            </div>
          )}
        </div>

        {/* Action buttons — wrap on small screens */}
        <div className="d-flex flex-wrap gap-2">

          {/* Rename (only when not editing) */}
          {!isEditing && (
            <button className="btn btn-sm btn-outline-primary" onClick={() => setIsEditing(true)}>
              ✏️ Rename
            </button>
          )}

          {/* Start Labeling */}
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => navigate(`/label/${file.id}`)}
          >
            🏷️ Label
          </button>

          {/* Review */}
          <button className="btn btn-sm btn-outline-info" onClick={handleReview}>
            👁 Review
          </button>

          {/* Download with format picker */}
          <div className="position-relative">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => setShowDownloadMenu((v) => !v)}
              disabled={downloading}
            >
              {downloading ? (
                <><span className="spinner-border spinner-border-sm me-1" />...</>
              ) : "⬇ Download"}
            </button>
            {showDownloadMenu && (
              <div
                className="position-absolute bg-white border rounded shadow-sm"
                style={{ zIndex: 200, minWidth: 170, top: "100%", left: 0 }}
              >
                <div className="p-2">
                  <p className="mb-2 small text-muted fw-semibold px-1">Choose format:</p>
                  <button
                    className="btn btn-sm btn-outline-primary w-100 mb-1"
                    onClick={() => handleDownload("csv")}
                  >
                    📄 CSV
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary w-100"
                    onClick={() => handleDownload("json")}
                  >
                    📋 JSON
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delete */}
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              if (window.confirm(`⚠️ Delete "${displayName}"?\n\nThis file and all its labeled data will be permanently deleted and cannot be recovered.`)) {
                onDelete(file.id);
              }
            }}
          >
            🗑 Delete
          </button>

        </div>
      </div>

      {/* ── Review Modal ──────────────────────────────────────────────────── */}
      {showReview && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowReview(false); }}
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title mb-0">
                    👁 Review: <span className="text-primary">{displayName}</span>
                  </h5>
                  {!reviewLoading && reviewData && (
                    <small className="text-muted">
                      {labeled} / {total} labeled ·{" "}
                      <span className={labeled === total ? "text-success fw-semibold" : "text-warning fw-semibold"}>
                        {labeled === total ? "✅ Complete" : `⏳ ${total - labeled} remaining`}
                      </span>
                    </small>
                  )}
                </div>
                <button className="btn-close" onClick={() => setShowReview(false)} />
              </div>

              <div className="modal-body">
                {reviewLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2 text-muted">Fetching data...</p>
                  </div>
                ) : !reviewData ? (
                  <div className="alert alert-danger">Failed to load data.</div>
                ) : (
                  <>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <small className="text-muted">Labeling Progress</small>
                        <small className="text-muted">{Math.round((labeled / total) * 100)}%</small>
                      </div>
                      <div className="progress" style={{ height: 8 }}>
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${(labeled / total) * 100}%`, transition: "width 0.4s" }}
                        />
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover table-sm align-middle">
                        <thead className="table-light sticky-top">
                          <tr>
                            <th style={{ width: 60 }}>#</th>
                            <th>{reviewData.labelColumn || "Text"}</th>
                            <th style={{ width: 160 }}>Label</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviewData.fields.map((f) => (
                            <tr key={f.id}>
                              <td className="text-muted">{f.id}</td>
                              <td>{f.value || <span className="text-muted fst-italic">(empty)</span>}</td>
                              <td>
                                {f.label ? (
                                  <span className="badge bg-success">{f.label}</span>
                                ) : (
                                  <span className="badge bg-light text-secondary border">Unlabeled</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>

              <div className="modal-footer">
                <small className="text-muted me-auto">
                  Labels:{" "}
                  {reviewData?.labels?.map((l) => (
                    <span key={l} className="badge bg-primary me-1">{l}</span>
                  ))}
                </small>
                <button className="btn btn-secondary" onClick={() => setShowReview(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FileItem;