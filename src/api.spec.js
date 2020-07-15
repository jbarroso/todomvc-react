import { fetchTodos, deleteTodo, addTodo, updateTodo } from './api';

describe('api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe('fetchTodos', () => {
    let mockTodo;

    beforeEach(() => {
      mockTodo = {
        id: 1,
        title: 'Fake Todo',
        isComplete: false,
      };
      fetch.mockResponse(JSON.stringify(mockTodo));
    });

    it('Should be called with the correct url', async () => {
      const expected = 'http://todobackend-app:8000/todos/';
      fetchTodos();
      expect(fetch).toHaveBeenCalledWith(expected);
    });

    it('Should return a response and todos', async () => {
      const result = await fetchTodos();
      expect(result).toEqual(mockTodo);
    });

    it('should return an error response', async () => {
      fetch.mockReject(new Error('Error fetching todos'));
      await expect(fetch()).rejects.toEqual(new Error('Error fetching todos'));
    });
  });

  describe('deleteTodo', () => {
    let mockTodo;

    beforeEach(() => {
      mockTodo = {
        id: 1,
        title: 'fake todo',
        isComplete: false,
      };
      fetch.mockResponse(JSON.stringify(mockTodo));
    });

    it('should delete a todo when passed an id', () => {
      const todo = mockTodo.id;
      const url = `http://todobackend-app:8000/todos/${todo}/`;
      const option = {
        method: 'DELETE',
      };
      deleteTodo(todo);
      expect(fetch).toHaveBeenCalledWith(url, option);
    });

    it('should return an error response', async () => {
      fetch.mockReject(Error('Error deleting todo'));
      await expect(fetch()).rejects.toEqual(new Error('Error deleting todo'));
    });
  });

  describe('addTodo', () => {
    const title = 'fake todo';
    let mockTodo;

    beforeEach(() => {
      mockTodo = {
        id: 1,
        title,
        isComplete: false,
      };
      fetch.mockResponse(JSON.stringify(mockTodo));
    });

    it('should post a new todo to the database', () => {
      const url = 'http://todobackend-app:8000/todos/';
      const options = {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
      addTodo(title);
      expect(fetch).toHaveBeenCalledWith(url, options);
    });

    it('should return a message if response is ok', async () => {
      await expect(addTodo(title)).resolves.toEqual(mockTodo);
    });

    it('should return an error response', async () => {
      fetch.mockReject(new Error('Error posting todo'));
      await expect(fetch()).rejects.toEqual(new Error('Error posting todo'));
    });
  });

  describe('updateTodos', () => {
    let mockTodo;

    beforeEach(() => {
      mockTodo = {
        id: 1,
        title: 'fake todo',
        isComplete: true,
      };

      fetch.mockResponse(JSON.stringify(mockTodo));
    });

    it('should edit a todo when passed an id of existing todo', () => {
      const url = `http://todobackend-app:8000/todos/${mockTodo.id}/`;
      const options = {
        method: 'PATCH',
        body: JSON.stringify(mockTodo),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
      updateTodo(mockTodo.id, mockTodo);
      expect(fetch).toHaveBeenCalledWith(url, options);
    });

    it('should return a message if the todo was updated', async () => {
      const { id } = mockTodo;
      const result = await updateTodo(id, mockTodo);
      expect(result).toEqual(mockTodo);
    });

    it('should return an error response', async () => {
      fetch.mockReject(new Error('Error editing todo'));

      await expect(fetch()).rejects.toEqual(new Error('Error editing todo'));
    });
  });
});
