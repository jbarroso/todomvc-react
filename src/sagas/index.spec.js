import { runSaga } from 'redux-saga';
import * as types from '../constants/ActionTypes';
import * as saga from './index';
import * as api from '../api';
import * as actions from '../actions';

jest.mock('../api');

describe('actions', () => {
  const errorMessage = 'Error message';
  const expectedError = new Error(errorMessage);
  let dispatched;

  beforeEach(() => {
    dispatched = [];
  });

  describe('addTodo', () => {
    const newTodo = {
      id: 'foo',
      title: 'Use Redux',
      completed: false,
    };

    beforeEach(() => {
      api.addTodo.mockReset();
    });

    it('should creates ADD_TODO_SUCCESS when fetching todos has been done', async () => {
      api.addTodo.mockReturnValue(newTodo);
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [] } }),
        },
        saga.addTodo,
        actions.addTodo(newTodo.title)
      );

      const expectedActions = [{ type: types.ADD_TODO_SUCCESS, newTodo }];

      expect(api.addTodo).toHaveBeenCalledWith(newTodo.title);
      expect(dispatched).toEqual(expectedActions);
    });

    it('should create ADD_TODO_FAILURE when addTodo throw an exception', async () => {
      api.addTodo.mockImplementationOnce(() => {
        throw expectedError;
      });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [] } }),
        },
        saga.addTodo,
        actions.addTodo(newTodo.title)
      );

      const expectedActions = [
        { type: types.ADD_TODO_FAILURE, error: errorMessage },
      ];
      expect(dispatched).toEqual(expectedActions);
    });
  });

  describe('deleteTodo', () => {
    const id = 'foo';

    beforeEach(() => {
      api.deleteTodo.mockReset();
    });

    it('should creates DELETE_TODO_SUCCESS when fetching todos has been done', async () => {
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [] } }),
        },
        saga.deleteTodo,
        actions.deleteTodo(id)
      );
      const expectedActions = [{ type: types.DELETE_TODO_SUCCESS, id }];
      expect(api.deleteTodo).toHaveBeenCalledWith(id);
      expect(dispatched).toEqual(expectedActions);
    });

    it('should create DELETE_TODO_FAILURE when deleteTodo throw an exception', async () => {
      api.deleteTodo.mockImplementationOnce(() => {
        throw expectedError;
      });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [] } }),
        },
        saga.deleteTodo,
        actions.deleteTodo(id)
      );
      const expectedActions = [
        { type: types.DELETE_TODO_FAILURE, error: errorMessage },
      ];
      expect(api.deleteTodo).toHaveBeenCalledWith(id);
      expect(dispatched).toEqual(expectedActions);
    });
  });

  describe('saveTodo', () => {
    const title = 'Use Redux Thunk';
    const todoToSave = {
      id: 'foo',
      title: 'Use Redux',
      completed: false,
    };

    beforeEach(() => {
      api.updateTodo.mockReset();
    });

    it('should creates SAVE_TODO_SUCCESS when updating todo has been done', async () => {
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [] } }),
        },
        saga.saveTodo,
        actions.saveTodo(todoToSave, title)
      );

      const expectedActions = [
        { type: types.SAVE_TODO_SUCCESS, todoToSave, title },
      ];
      expect(api.updateTodo).toHaveBeenCalledWith(todoToSave.id, { title });
      expect(dispatched).toEqual(expectedActions);
    });

    it('should create SAVE_TODO_FAILURE when updating throw an exception', async () => {
      api.updateTodo.mockImplementationOnce(() => {
        throw expectedError;
      });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [] } }),
        },
        saga.saveTodo,
        actions.saveTodo(todoToSave, title)
      );
      const expectedActions = [
        { type: types.SAVE_TODO_FAILURE, error: errorMessage },
      ];
      expect(dispatched).toEqual(expectedActions);
    });
  });

  describe('completeTodo', () => {
    const id = 'foo';

    beforeEach(() => {
      api.updateTodo.mockReset();
    });

    it('should creates COMPLETE_TODO_SUCCESS when updating todo has been done', async () => {
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [{ id, completed: false }] } }),
        },
        saga.completeTodo,
        actions.completeTodo(id)
      );
      const expectedActions = [{ type: types.COMPLETE_TODO_SUCCESS, id }];
      expect(api.updateTodo).toHaveBeenCalledWith(id, { completed: true });
      expect(dispatched).toEqual(expectedActions);
    });

    it('should create COMPLETE_TODO_FAILURE when updating throw an exception', async () => {
      api.updateTodo.mockImplementationOnce(() => {
        throw expectedError;
      });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [{ id, completed: false }] } }),
        },
        saga.completeTodo,
        actions.completeTodo(id)
      );
      const expectedActions = [
        { type: types.COMPLETE_TODO_FAILURE, error: errorMessage },
      ];
      expect(dispatched).toEqual(expectedActions);
    });
  });

  describe('completeAllTodos', () => {
    beforeEach(() => {
      api.updateTodo.mockReset();
    });

    it('should creates COMPLETE_ALL_TODOS_SUCCESS when todos are not completed', async () => {
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({
            todos: {
              todos: [
                { id: 'foo', completed: false },
                { id: 'bar', completed: false },
              ],
            },
          }),
        },
        saga.completeAllTodos,
        actions.completeAllTodos()
      );

      const expectedActions = [{ type: types.COMPLETE_ALL_TODOS_SUCCESS }];

      expect(api.updateTodo).toHaveBeenNthCalledWith(1, 'foo', {
        completed: true,
      });
      expect(api.updateTodo).toHaveBeenNthCalledWith(2, 'bar', {
        completed: true,
      });
      expect(dispatched).toEqual(expectedActions);
    });

    it('should creates COMPLETE_ALL_TODOS_SUCCESS when all todos are completed', async () => {
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({
            todos: {
              todos: [
                { id: 'foo', completed: true },
                { id: 'bar', completed: true },
              ],
            },
          }),
        },
        saga.completeAllTodos,
        actions.completeAllTodos()
      );

      const expectedActions = [{ type: types.COMPLETE_ALL_TODOS_SUCCESS }];

      expect(api.updateTodo).toHaveBeenNthCalledWith(1, 'foo', {
        completed: false,
      });
      expect(api.updateTodo).toHaveBeenNthCalledWith(2, 'bar', {
        completed: false,
      });
      expect(dispatched).toEqual(expectedActions);
    });

    it('should create COMPLETE_ALL_TODOS_FAILURE when updating throw an exception', async () => {
      api.updateTodo.mockImplementation(() => {
        throw expectedError;
      });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({
            todos: {
              todos: [
                { id: 'foo', completed: true },
                { id: 'bar', completed: true },
              ],
            },
          }),
        },
        saga.completeAllTodos,
        actions.completeAllTodos()
      );

      const expectedActions = [
        { type: types.COMPLETE_ALL_TODOS_FAILURE, error: errorMessage },
      ];

      expect(dispatched).toEqual(expectedActions);
    });
  });

  describe('clearCompleted', () => {
    beforeEach(() => {
      api.deleteTodo.mockReset();
    });

    it('should creates CLEAR_COMPLETED_SUCCESS with completed todos', async () => {
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({
            todos: {
              todos: [
                { id: 'foo', completed: true },
                { id: 'bar', completed: true },
                { id: 'duh', completed: false },
              ],
            },
          }),
        },
        saga.clearCompleted,
        actions.clearCompleted()
      );

      const expectedActions = [{ type: types.CLEAR_COMPLETED_SUCCESS }];

      expect(api.deleteTodo).toHaveBeenCalledTimes(2);
      expect(api.deleteTodo).toHaveBeenNthCalledWith(1, 'foo');
      expect(api.deleteTodo).toHaveBeenNthCalledWith(2, 'bar');
      expect(dispatched).toEqual(expectedActions);
    });

    it('should create CLEAR_COMPLETED_FAILURE when updating throw an exception', async () => {
      api.deleteTodo.mockImplementation(() => {
        throw expectedError;
      });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({
            todos: {
              todos: [
                { id: 'foo', completed: true },
                { id: 'bar', completed: true },
              ],
            },
          }),
        },
        saga.clearCompleted,
        actions.clearCompleted()
      );
      const expectedActions = [
        { type: types.CLEAR_COMPLETED_FAILURE, error: errorMessage },
      ];
      expect(dispatched).toEqual(expectedActions);
    });
  });

  describe('fetchTodos', () => {
    const expectedTodos = [
      {
        id: 'foo',
        title: 'my title',
        completed: false,
      },
    ];

    beforeEach(() => {
      api.fetchTodos.mockReset();
    });

    it('should creates FETCH_TODOS_SUCCESS when fetching todos has been done', async () => {
      api.fetchTodos.mockReturnValue(expectedTodos);
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [] } }),
        },
        saga.fetchTodos,
        actions.fetchTodos()
      );

      const expectedActions = [
        { type: types.FETCH_TODOS_SUCCESS, todos: expectedTodos },
      ];
      expect(dispatched).toEqual(expectedActions);
    });

    it('should create FETCH_TODOS_FAILURE when fetching todos throw an exception', async () => {
      api.fetchTodos.mockImplementationOnce(() => {
        throw expectedError;
      });
      await runSaga(
        {
          dispatch: (action) => dispatched.push(action),
          getState: () => ({ todos: { todos: [] } }),
        },
        saga.fetchTodos,
        actions.fetchTodos()
      );
      const expectedActions = [
        { type: types.FETCH_TODOS_FAILURE, error: errorMessage },
      ];

      expect(dispatched).toEqual(expectedActions);
    });
  });
});
