const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
// VITE_GEMINI_API_KEY
/**
 * Ask Gemini to classify `text` into one of `availableLabels`.
 * Returns the best matching label string (exact match from the list).
 *
 * @param {string} text - The text to classify
 * @param {string[]} availableLabels - Labels the user has defined
 * @returns {Promise<string>} - One label from availableLabels
 */
export const getGeminiLabel = async (text, availableLabels) => {
  if (!text?.trim()) return availableLabels[0];

  const prompt = `You are a data labeling assistant. Your job is to classify text into exactly one of the given labels.

Available labels: ${availableLabels.map((l) => `"${l}"`).join(", ")}

Text to classify:
"${text}"

Rules:
- Reply with ONLY the label, nothing else.
- Choose the single best fitting label from the list above.
- Do NOT add any explanation, punctuation, or extra words.

Your answer:`;

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,      // low temp = consistent, deterministic output
        maxOutputTokens: 20,   // labels are short, no need for more
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Gemini API error: ${err?.error?.message || response.status}`);
  }

  const data = await response.json();
  const rawAnswer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

  // Find the closest matching label (case-insensitive)
  const matched = availableLabels.find(
    (l) => l.toLowerCase() === rawAnswer.toLowerCase()
  );

  // Fallback: if Gemini returned something unexpected, pick first label
  return matched ?? availableLabels[0];
};
