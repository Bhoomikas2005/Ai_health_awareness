const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getHealthAwareness(prompt) {
  try {
    const res = await fetch(`${API_URL}/health-awareness`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.generatedText;
  } catch (err) {
    console.error("Health Awareness API error:", err);
    throw new Error("Unable to connect to the health tips service. Please try again later.");
  }
}
