/**
 * Parses CSV text and returns { headers, rows }
 * headers: string[] - column names from first row
 * rows: object[] - each row as { id, ...columns, label: "" }
 */
export const csvToJson = (csvText) => {
  const lines = csvText.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((h) => h.trim());

  const rows = lines
    .slice(1)
    .filter((line) => line.trim() !== "")
    .map((line, index) => {
      const values = line.split(",");
      const obj = { id: index + 1, label: "" };
      headers.forEach((header, i) => {
        obj[header] = values[i]?.trim() ?? "";
      });
      return obj;
    });

  return { headers, rows };
};