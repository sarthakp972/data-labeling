import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getFileById, saveLabelsForPage } from "../../../services/firestoreService";
import { getGeminiLabel } from "../../../services/geminiService";

const ITEMS_PER_PAGE = 5;

function DataTable() {
  const { id: fileId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fields, setFields] = useState([]);
  const [labels, setLabels] = useState([]);
  const [fileName, setFileName] = useState("");
  const [labelColumn, setLabelColumn] = useState("");

  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState(false);
  const [loadingFile, setLoadingFile] = useState(true);
  const [error, setError] = useState("");

  // AI loading states
  const [aiLoadingRow, setAiLoadingRow] = useState(null); // rowId being processed
  const [aiLoadingBulk, setAiLoadingBulk] = useState(false);

  const totalPages = Math.ceil(fields.length / ITEMS_PER_PAGE);
  const isLastPages = page >= totalPages - 1 && totalPages > 0;
  const isLastPage = page === totalPages;

  // ── Fetch file from Firestore ─────────────────────────────────────────────
  useEffect(() => {
    const fetchFile = async () => {
      if (!user || !fileId) return;
      setLoadingFile(true);
      try {
        const fileDoc = await getFileById(user.uid, fileId);
        if (!fileDoc) { setError("File not found."); return; }
        setFields(fileDoc.fields ?? []);
        setLabels(fileDoc.labels ?? []);
        setFileName(fileDoc.fileName ?? "");
        setLabelColumn(fileDoc.labelColumn ?? "");
      } catch (err) {
        console.error(err);
        setError("Failed to load file.");
      } finally {
        setLoadingFile(false);
      }
    };
    fetchFile();
  }, [user, fileId]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentRows = fields.slice(start, start + ITEMS_PER_PAGE);

  // ── Manual label select ───────────────────────────────────────────────────
  const handleSelectLabel = (rowId, label) => {
    setFields((prev) =>
      prev.map((f) => (f.id === rowId ? { ...f, label } : f))
    );
  };

  // ── AI Suggest — single row ───────────────────────────────────────────────
  const handleAISuggestRow = async (row) => {
    if (aiLoadingRow || aiLoadingBulk) return;
    setAiLoadingRow(row.id);
    try {
      const suggested = await getGeminiLabel(row.value, labels);
      handleSelectLabel(row.id, suggested);
    } catch (err) {
      console.error("AI suggest failed:", err);
      // Optional: you could show a toast or alert here if Gemini fails
    } finally {
      setAiLoadingRow(null);
    }
  };

  // ── AI Label All — bulk (all rows on current page) ────────────────────────
  const handleAILabelAll = async () => {
    if (aiLoadingRow || aiLoadingBulk) return;
    setAiLoadingBulk(true);
    try {
      // Run AI for all current-page rows (in parallel for speed)
      const results = await Promise.all(
        currentRows.map((row) => getGeminiLabel(row.value, labels))
      );
      // Apply all at once
      setFields((prev) => {
        const updated = [...prev];
        currentRows.forEach((row, i) => {
          const idx = updated.findIndex((f) => f.id === row.id);
          if (idx !== -1) updated[idx] = { ...updated[idx], label: results[i] };
        });
        return updated;
      });
    } catch (err) {
      console.error("AI bulk label failed:", err);
    } finally {
      setAiLoadingBulk(false);
    }
  };

  // ── Save & Next ───────────────────────────────────────────────────────────
  const handleSaveAndNext = async () => {
    setSaving(true);
    setError("");
    try {
      await saveLabelsForPage(
        user.uid,
        fileId,
        currentRows.map(({ id, label }) => ({ id, label }))
      );
      if (!isLastPage) setPage((p) => p + 1);
    } catch (err) {
      console.error(err);
      setError("Failed to save labels. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── End Labeling ──────────────────────────────────────────────────────────
  const handleEnd = async () => {
    setSaving(true);
    try {
      await saveLabelsForPage(
        user.uid,
        fileId,
        currentRows.map(({ id, label }) => ({ id, label }))
      );
      navigate("/files");
    } catch (err) {
      console.error(err);
      setError("Failed to save. Please try again.");
      setSaving(false);
    }
  };

  // ── Loading / error ───────────────────────────────────────────────────────
  if (loadingFile) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2 text-muted">Loading file...</p>
      </div>
    );
  }
  if (error && fields.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="container mt-4">

      {/* ── Header ── */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div>
          <h4 className="mb-0">{fileName || "Labeling"}</h4>
          {labelColumn && (
            <small className="text-muted">Column: <em>{labelColumn}</em></small>
          )}
        </div>
        <span className="badge bg-secondary fs-6">
          Page {page} / {totalPages}
        </span>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      {/* ── Progress bar ── */}
      <div className="progress mb-3" style={{ height: 8 }}>
        <div
          className="progress-bar bg-success"
          style={{ width: `${(page / totalPages) * 100}%`, transition: "width 0.4s" }}
        />
      </div>

      {/* ── AI Bulk button bar ── */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-outline-warning d-flex align-items-center gap-2"
          onClick={handleAILabelAll}
          disabled={aiLoadingBulk || aiLoadingRow !== null || saving}
          title="Let AI suggest labels for all 5 rows on this page"
        >
          {aiLoadingBulk ? (
            <>
              <span className="spinner-border spinner-border-sm" />
              AI Labeling All...
            </>
          ) : (
            <>
              🤖 AI Label All ({currentRows.length})
            </>
          )}
        </button>
      </div>

      {/* ── Row cards ── */}
      <div className="d-flex flex-column gap-3">
        {currentRows.map((row, index) => (
          <div
            key={row.id}
            className={`card shadow-sm p-3 ${
              aiLoadingRow === row.id ? "border-warning" : ""
            }`}
          >
            {/* Row meta */}
            <div className="d-flex justify-content-between align-items-start mb-1">
              <small className="text-muted">
                #{start + index + 1} of {fields.length}
              </small>

              {/* AI Suggest — single row */}
              <button
                className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1"
                onClick={() => handleAISuggestRow(row)}
                disabled={aiLoadingRow !== null || aiLoadingBulk || saving}
                title="Let AI suggest a label for this row"
              >
                {aiLoadingRow === row.id ? (
                  <>
                    <span className="spinner-border spinner-border-sm" />
                    Thinking...
                  </>
                ) : (
                  "🤖 AI Suggest"
                )}
              </button>
            </div>

            {/* Text to label */}
            <p className="fs-5 fw-medium mb-3" style={{ lineHeight: 1.6 }}>
              {row.value || (
                <span className="text-muted fst-italic">(empty)</span>
              )}
            </p>

            {/* Manual label buttons */}
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <small className="text-muted me-1">Label:</small>
              {labels.map((label) => (
                <button
                  key={label}
                  className={`btn btn-sm ${
                    row.label === label ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => handleSelectLabel(row.id, label)}
                  disabled={aiLoadingRow === row.id || aiLoadingBulk}
                >
                  {label}
                </button>
              ))}
              {row.label && (
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleSelectLabel(row.id, "")}
                  disabled={aiLoadingRow === row.id || aiLoadingBulk}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Label badge */}
            {row.label && (
              <div className="mt-2">
                <span className={`badge ${aiLoadingRow === row.id ? "bg-warning text-dark" : "bg-success"}`}>
                  {aiLoadingRow === row.id ? "🤖 AI suggesting..." : `✓ ${row.label}`}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Navigation ── */}
      <div className="d-flex justify-content-between align-items-center mt-4 mb-5">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1 || saving || aiLoadingBulk || aiLoadingRow !== null}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Previous
        </button>

        <div className="d-flex gap-2">
          {isLastPages && (
            <button
              className="btn btn-danger"
              onClick={handleEnd}
              disabled={saving || aiLoadingBulk || aiLoadingRow !== null}
            >
              {saving ? (
                <><span className="spinner-border spinner-border-sm me-1" />Saving...</>
              ) : "✅ End Labeling"}
            </button>
          )}
          {!isLastPage && (
            <button
              className="btn btn-success"
              onClick={handleSaveAndNext}
              disabled={saving || aiLoadingBulk || aiLoadingRow !== null}
            >
              {saving ? (
                <><span className="spinner-border spinner-border-sm me-1" />Saving...</>
              ) : "Save & Next →"}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

export default DataTable;