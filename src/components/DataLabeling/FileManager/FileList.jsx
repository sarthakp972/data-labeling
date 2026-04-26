import { useState, useEffect, useCallback } from "react";
import FileItem from "./FileItem";
import { useAuth } from "../../../context/AuthContext";
import { getUserFiles, deleteUserFile, renameUserFile } from "../../../services/firestoreService";

function FileList({ refreshTrigger }) {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFiles = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const userFiles = await getUserFiles(user.uid);
      // Sort by createdAt descending (newest first)
      userFiles.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() ?? 0;
        const bTime = b.createdAt?.toMillis?.() ?? 0;
        return bTime - aTime;
      });
      setFiles(userFiles);
    } catch (err) {
      console.error(err);
      setError("Failed to load files. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch on mount and when a new file is saved (refreshTrigger changes)
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles, refreshTrigger]);

  // Delete from Firestore then update local list
  const handleDelete = async (id) => {
    try {
      await deleteUserFile(user.uid, id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete file.");
    }
  };

  // Rename in Firestore then update local list
  const handleRename = async (id, newName) => {
    try {
      await renameUserFile(user.uid, id, newName);
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, fileName: newName } : f))
      );
    } catch (err) {
      console.error("Rename failed:", err);
      setError("Failed to rename file.");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Your Files</h4>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="card p-3 shadow-sm">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-4">
            <div className="spinner-border text-primary me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="text-muted">Loading your files...</span>
          </div>
        ) : files.length === 0 ? (
          <p className="text-muted mb-0">No files uploaded yet. Upload a file to get started!</p>
        ) : (
          files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FileList;