const API_URL = process.env.REACT_APP_API_URL || 'http://todobackend-app:8000';
const TODOS_URL = `${API_URL}/todos/`;

export const fetchTodos = async () => {
  const response = await fetch(TODOS_URL);
  return response.json();
};

export const addTodo = async (title) => {
  const response = await fetch(TODOS_URL, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  return response.json();
};

export const deleteTodo = async (id) =>
  fetch(`${TODOS_URL}${id}/`, {
    method: 'DELETE',
  });

export const updateTodo = async (id, params) => {
  const response = await fetch(`${TODOS_URL}${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  return response.json();
};
