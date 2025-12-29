const API_URL = "http://127.0.0.1:8000/api";

export async function getBoards() {
  const res = await fetch(`${API_URL}/boards`);
  return res.json();
}

export async function createBoard(name) {
  const res = await fetch(`${API_URL}/boards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}
