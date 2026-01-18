const API_URL = "http://127.0.0.1:8000/api";

function authHeaders() {
  const token = localStorage.getItem("token");

  if (!token) return {
    "Content-Type": "application/json"
  };

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

export async function getBoards() {
  const res = await fetch(`${API_URL}/boards`);
  return res.json();
}

export async function createBoard(name) {
  const res = await fetch(`${API_URL}/boards`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

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

export const createTask = async (title, boardId, categoryId) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      title,
      board_id: boardId,
      category_id: categoryId || null
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
};

export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}

// auth

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}


export async function loginUser(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: authHeaders(),
  });

  localStorage.removeItem("token");
}

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}