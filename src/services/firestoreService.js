import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Save a labeling file under users/{uid}/files
 *
 * Firestore structure:
 *  users/{uid}/files/{fileId}
 *    { fileName, labelColumn, labels, createdAt,
 *      fields: [{ id, key, value, label }] }
 */
export const saveFileToFirestore = async (uid, { fileName, labelColumn, labels, data }) => {

  // Build a clean fields array — only primitive string/number values, no nested objects.
  // This is the safest way to avoid "Document fields must not be empty" errors.
  const fields = data.map((row) => ({
    id: Number(row.id) || 0,
    key: String(labelColumn || ""),
    value: String(row.text || ""),
    label: String(row.label || ""),
  }));

  const filesRef = collection(db, "users", uid, "files");

  const docRef = await addDoc(filesRef, {
    fileName: String(fileName || ""),
    labelColumn: String(labelColumn || ""),
    labels: labels.map((l) => String(l)),
    fields,                    // clean flat objects only
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

/**
 * Fetch a single file document by its ID
 */
export const getFileById = async (uid, fileId) => {
  const fileRef = doc(db, "users", uid, "files", fileId);
  const snap = await getDoc(fileRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

/**
 * Save labels for multiple rows at once (single read → patch → single write).
 * Avoids the race condition of concurrent individual saves overwriting each other.
 *
 * @param {string} uid - Firebase user ID
 * @param {string} fileId - File document ID
 * @param {Array<{id: number, label: string}>} rowUpdates - rows to patch
 */
export const saveLabelsForPage = async (uid, fileId, rowUpdates) => {
  const fileRef = doc(db, "users", uid, "files", fileId);
  const snap = await getDoc(fileRef);
  if (!snap.exists()) throw new Error("File not found");

  // Build a lookup map: rowId → new label
  const labelMap = {};
  rowUpdates.forEach(({ id, label }) => {
    labelMap[id] = String(label ?? "");
  });

  // Patch only the rows that appear in the current page; leave all others unchanged
  const updatedFields = (snap.data().fields ?? []).map((f) =>
    labelMap[f.id] !== undefined ? { ...f, label: labelMap[f.id] } : f
  );

  await updateDoc(fileRef, { fields: updatedFields });
};

/**
 * Fetch all files for a user from users/{uid}/files
 */
export const getUserFiles = async (uid) => {
  const filesRef = collection(db, "users", uid, "files");
  const snapshot = await getDocs(filesRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Delete a file from users/{uid}/files/{fileId}
 */
export const deleteUserFile = async (uid, fileId) => {
  const fileRef = doc(db, "users", uid, "files", fileId);
  await deleteDoc(fileRef);
};

/**
 * Rename a file (update fileName field)
 */
export const renameUserFile = async (uid, fileId, newName) => {
  const fileRef = doc(db, "users", uid, "files", fileId);
  await updateDoc(fileRef, { fileName: String(newName) });
};
