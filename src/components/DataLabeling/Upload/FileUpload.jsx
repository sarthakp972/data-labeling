import { useState } from "react";
import { csvToJson } from "../../../utils/csvToJson";
import { useAuth } from "../../../context/AuthContext";
import { saveFileToFirestore } from "../../../services/firestoreService";

function FileUpload({ onFileSaved }) {
  const { user } = useAuth();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");          // editable display name
  const [fileColumns, setFileColumns] = useState([]);   // detected column names
  const [labelColumn, setLabelColumn] = useState("");   // which column to label
  const [labels, setLabels] = useState([]);
  const [inputLabel, setInputLabel] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // ── Parse file headers on selection ──────────────────────────────────────
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const name = selectedFile.name.toLowerCase();

    if (!name.endsWith(".csv") && !name.endsWith(".json")) {
      setError("Only CSV and JSON files are allowed ❌");
      setFile(null);
      setFileColumns([]);
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB ⚠️");
      setFile(null);
      setFileColumns([]);
      return;
    }

    setError("");
    setSuccessMsg("");
    setFile(selectedFile);
    setFileName(selectedFile.name.replace(/\.[^.]+$/, "")); // strip extension for display name
    setFileColumns([]);
    setLabelColumn("");

    // Read file immediately to extract column names for suggestion
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        let cols = [];

        if (name.endsWith(".csv")) {
          const firstLine = text.trim().split(/\r?\n/)[0];
          cols = firstLine.split(",").map((h) => h.trim()).filter(Boolean);
        } else {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            cols = Object.keys(parsed[0]);
          }
        }

        setFileColumns(cols);
      } catch {
        // silently ignore preview parse errors
      }
    };
    reader.readAsText(selectedFile);
  };

  // ── Label column suggestion helpers ──────────────────────────────────────
  const filteredSuggestions = fileColumns.filter(
    (col) =>
      col.toLowerCase().includes(labelColumn.toLowerCase()) &&
      labelColumn.trim() !== ""
  );

  const handleSelectSuggestion = (col) => {
    setLabelColumn(col);
    setShowSuggestions(false);
  };

  // ── Add / remove label tags ───────────────────────────────────────────────
  const handleAddLabel = () => {
    const trimmed = inputLabel.trim();
    if (!trimmed) return;
    const exists = labels.some((l) => l.toLowerCase() === trimmed.toLowerCase());
    if (!exists) setLabels([...labels, trimmed]);
    setInputLabel("");
    setError("");
  };

  const handleRemoveLabel = (label) => {
    setLabels(labels.filter((l) => l !== label));
  };

  // ── Upload, convert & save to Firestore ──────────────────────────────────
  const handleUpload = () => {
    let updatedLabels = [...labels];
    const trimmedInput = inputLabel.trim();
    if (trimmedInput) {
      const exists = updatedLabels.some(
        (l) => l.toLowerCase() === trimmedInput.toLowerCase()
      );
      if (!exists) updatedLabels.push(trimmedInput);
    }

    if (!file) { setError("Please upload a valid file first ⚠️"); return; }
    if (!labelColumn.trim()) { setError("Please select or enter the column you want to label ⚠️"); return; }
    if (updatedLabels.length === 0) { setError("Please add at least one label ⚠️"); return; }
    if (!fileName.trim()) { setError("Please enter a file name ⚠️"); return; }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    const reader = new FileReader();

    reader.onload = async (ev) => {
      try {
        const text = ev.target.result;
        let jsonData = [];

        if (file.name.endsWith(".csv")) {
          const { headers, rows } = csvToJson(text);

          if (!headers.includes(labelColumn.trim())) {
            throw new Error(
              `Column "${labelColumn.trim()}" not found. Available: ${headers.join(", ")}`
            );
          }

          jsonData = rows.map((row) => ({
            id: row.id,
            text: row[labelColumn.trim()],
            label: "",
            _raw: row,
          }));
        } else {
          const parsed = JSON.parse(text);
          if (!Array.isArray(parsed)) throw new Error("JSON must be an array ❌");

          jsonData = parsed.map((item, index) => ({
            id: index + 1,
            text: item[labelColumn.trim()] ?? "",
            label: "",
            _raw: item,
          }));
        }

        // ── Save to Firestore ──
        const fileId = await saveFileToFirestore(user.uid, {
          fileName: fileName.trim(),
          labelColumn: labelColumn.trim(),
          labels: updatedLabels,
          data: jsonData,
        });

        setSuccessMsg(`✅ File "${fileName.trim()}" saved successfully!`);
        setFile(null);
        setFileName("");
        setFileColumns([]);
        setLabelColumn("");
        setLabels([]);
        setInputLabel("");
        setLoading(false);

        // notify parent to refresh file list
        if (onFileSaved) onFileSaved(fileId);

      } catch (err) {
        console.error(err);
        setError(err.message || "Error saving file ❌");
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="card p-4 shadow-sm">
      <h5 className="mb-3">Upload Data</h5>

      {/* File Input */}
      <input
        type="file"
        accept=".csv,.json"
        className="form-control mb-2"
        onChange={handleFileChange}
      />

      {/* Detected columns preview */}
      {fileColumns.length > 0 && (
        <div className="mb-3">
          <small className="text-muted">
            Detected columns:{" "}
            {fileColumns.map((col) => (
              <span
                key={col}
                className="badge bg-secondary me-1"
                style={{ cursor: "pointer" }}
                onClick={() => setLabelColumn(col)}
                title="Click to use as label column"
              >
                {col}
              </span>
            ))}
          </small>
        </div>
      )}

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}

      {/* File Display Name */}
      <div className="mb-3">
        <label className="form-label fw-semibold">File Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Give this dataset a name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>

      {/* Column to Label */}
      <div className="mb-3 position-relative">
        <label className="form-label fw-semibold">
          Column to Label{" "}
          <span className="text-muted fw-normal" style={{ fontSize: "0.85em" }}>
            (which column contains the text you want to label?)
          </span>
        </label>
        <input
          type="text"
          className="form-control"
          placeholder={
            fileColumns.length > 0 ? `e.g. ${fileColumns[0]}` : "Enter exact column name"
          }
          value={labelColumn}
          onChange={(e) => { setLabelColumn(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          autoComplete="off"
        />

        {/* Autocomplete dropdown — filtered */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 shadow-sm" style={{ zIndex: 100, top: "100%" }}>
            {filteredSuggestions.map((col) => (
              <li key={col} className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }} onMouseDown={() => handleSelectSuggestion(col)}>
                {col}
              </li>
            ))}
          </ul>
        )}

        {/* Show all when focused and empty */}
        {showSuggestions && labelColumn.trim() === "" && fileColumns.length > 0 && (
          <ul className="list-group position-absolute w-100 shadow-sm" style={{ zIndex: 100, top: "100%" }}>
            {fileColumns.map((col) => (
              <li key={col} className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }} onMouseDown={() => handleSelectSuggestion(col)}>
                {col}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Label Tags Input */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Add Labels</label>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Positive, Negative"
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddLabel(); } }}
          />
          <button className="btn btn-primary" onClick={handleAddLabel}>Add</button>
        </div>
      </div>

      {/* Label Chips */}
      <div className="mb-3">
        {labels.map((label, index) => (
          <span key={index} className="badge bg-primary me-2"
            style={{ cursor: "pointer" }} onClick={() => handleRemoveLabel(label)} title="Click to remove">
            {label} ❌
          </span>
        ))}
      </div>

      {/* Upload Button */}
      <button className="btn btn-success w-100" onClick={handleUpload} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" />
            Saving to cloud...
          </>
        ) : (
          "Upload & Save"
        )}
      </button>
    </div>
  );
}

export default FileUpload;