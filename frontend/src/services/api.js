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

export async function getBoard(id) {
  const res = await fetch(`${API_URL}/boards/${id}`);
  return res.json();
}

export async function getBoardTasks(id) {
  const res = await fetch(`${API_URL}/boards/${id}/tasks`);
  return res.json();
}

export async function createTask(title, boardId) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      board_id: boardId,
    }),
  });
  return res.json();
}

export async function updateTaskStatus(id, status) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update task")
  }

  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch( `${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  
  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}