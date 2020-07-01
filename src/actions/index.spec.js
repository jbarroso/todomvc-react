import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../constants/ActionTypes';
import * as actions from './index';
import * as api from '../api';

jest.mock('../api');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const errorMessage = 'Error message';
  const expectedError = new Error(errorMessage);
  let store;

  beforeEach(() => {
    store = mockStore({ todos: { todos: [] } });
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
      const expectedActions = [
        { type: types.ADD_TODO_REQUEST },
        { type: types.ADD_TODO_SUCCESS, newTodo },
      ];
      api.addTodo.mockReturnValue(newTodo);

      await store.dispatch(actions.addTodo(newTodo.title));

      expect(api.addTodo).toHaveBeenCalledWith(newTodo.title);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create ADD_TODO_FAILURE when addTodo throw an exception', async () => {
      const expectedActions = [
        { type: types.ADD_TODO_REQUEST },
        { type: types.ADD_TODO_FAILURE, error: errorMessage },
      ];

      api.addTodo.mockImplementationOnce(() => {
        throw expectedError;
      });

      await store.dispatch(actions.addTodo(newTodo.title));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('deleteTodo', () => {
    const id = 'foo';

    beforeEach(() => {
      api.deleteTodo.mockReset();
    });

    it('should creates DELETE_TODO_SUCCESS when fetching todos has been done', async () => {
      const expectedActions = [
        { type: types.DELETE_TODO_REQUEST },
        { type: types.DELETE_TODO_SUCCESS, id },
      ];

      await store.dispatch(actions.deleteTodo(id));

      expect(api.deleteTodo).toHaveBeenCalledWith(id);
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create DELETE_TODO_FAILURE when deleteTodo throw an exception', async () => {
      const expectedActions = [
        { type: types.DELETE_TODO_REQUEST },
        { type: types.DELETE_TODO_FAILURE, error: errorMessage },
      ];

      api.deleteTodo.mockImplementationOnce(() => {
        throw expectedError;
      });

      await store.dispatch(actions.deleteTodo(id));
      expect(store.getActions()).toEqual(expectedActions);
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
      const expectedActions = [
        { type: types.SAVE_TODO_REQUEST },
        { type: types.SAVE_TODO_SUCCESS, todoToSave, title },
      ];
      await store.dispatch(actions.saveTodo(todoToSave, title));

      expect(api.updateTodo).toHaveBeenCalledWith(todoToSave.id, { title });
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create SAVE_TODO_FAILURE when updating throw an exception', async () => {
      const expectedActions = [
        { type: types.SAVE_TODO_REQUEST },
        { type: types.SAVE_TODO_FAILURE, error: errorMessage },
      ];

      api.updateTodo.mockImplementationOnce(() => {
        throw expectedError;
      });

      await store.dispatch(actions.saveTodo(todoToSave, title));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('completeTodo', () => {
    const id = 'foo';

    beforeEach(() => {
      store = mockStore({ todos: { todos: [{ id, completed: false }] } });
      api.updateTodo.mockReset();
    });

    it('should creates COMPLETE_TODO_SUCCESS when updating todo has been done', async () => {
      const expectedActions = [
        { type: types.COMPLETE_TODO_REQUEST },
        { type: types.COMPLETE_TODO_SUCCESS, id },
      ];
      await store.dispatch(actions.completeTodo(id));

      expect(api.updateTodo).toHaveBeenCalledWith(id, { completed: true });
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create COMPLETE_TODO_FAILURE when updating throw an exception', async () => {
      const expectedActions = [
        { type: types.COMPLETE_TODO_REQUEST },
        { type: types.COMPLETE_TODO_FAILURE, error: errorMessage },
      ];

      api.updateTodo.mockImplementationOnce(() => {
        throw expectedError;
      });

      await store.dispatch(actions.completeTodo(id));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('completeAllTodos', () => {
    beforeEach(() => {
      api.updateTodo.mockReset();
    });

    it('should creates COMPLETE_ALL_TODOS_SUCCESS when todos are not completed', async () => {
      store = mockStore({
        todos: {
          todos: [
            { id: 'foo', completed: false },
            { id: 'bar', completed: false },
          ],
        },
      });
      const expectedActions = [
        { type: types.COMPLETE_ALL_TODOS_REQUEST },
        { type: types.COMPLETE_ALL_TODOS_SUCCESS },
      ];
      await store.dispatch(actions.completeAllTodos());

      expect(api.updateTodo).toHaveBeenNthCalledWith(1, 'foo', {
        completed: true,
      });
      expect(api.updateTodo).toHaveBeenNthCalledWith(2, 'bar', {
        completed: true,
      });
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should creates COMPLETE_ALL_TODOS_SUCCESS when all todos are completed', async () => {
      store = mockStore({
        todos: {
          todos: [
            { id: 'foo', completed: true },
            { id: 'bar', completed: true },
          ],
        },
      });
      const expectedActions = [
        { type: types.COMPLETE_ALL_TODOS_REQUEST },
        { type: types.COMPLETE_ALL_TODOS_SUCCESS },
      ];
      await store.dispatch(actions.completeAllTodos());

      expect(api.updateTodo).toHaveBeenNthCalledWith(1, 'foo', {
        completed: false,
      });
      expect(api.updateTodo).toHaveBeenNthCalledWith(2, 'bar', {
        completed: false,
      });
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create COMPLETE_ALL_TODOS_FAILURE when updating throw an exception', async () => {
      store = mockStore({
        todos: {
          todos: [
            { id: 'foo', completed: true },
            { id: 'bar', completed: true },
          ],
        },
      });

      const expectedActions = [
        { type: types.COMPLETE_ALL_TODOS_REQUEST },
        { type: types.COMPLETE_ALL_TODOS_FAILURE, error: errorMessage },
      ];

      api.updateTodo.mockImplementation(() => {
        throw expectedError;
      });

      await store.dispatch(actions.completeAllTodos());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('clearCompleted', () => {
    beforeEach(() => {
      api.deleteTodo.mockReset();
    });

    it('should creates CLEAR_COMPLETED_SUCCESS with completed todos', async () => {
      store = mockStore({
        todos: {
          todos: [
            { id: 'foo', completed: true },
            { id: 'bar', completed: true },
            { id: 'duh', completed: false },
          ],
        },
      });
      const expectedActions = [
        { type: types.CLEAR_COMPLETED_REQUEST },
        { type: types.CLEAR_COMPLETED_SUCCESS },
      ];
      await store.dispatch(actions.clearCompleted());

      expect(api.deleteTodo).toHaveBeenCalledTimes(2);
      expect(api.deleteTodo).toHaveBeenNthCalledWith(1, 'foo');
      expect(api.deleteTodo).toHaveBeenNthCalledWith(2, 'bar');
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create CLEAR_COMPLETED_FAILURE when updating throw an exception', async () => {
      store = mockStore({
        todos: {
          todos: [
            { id: 'foo', completed: true },
            { id: 'bar', completed: true },
          ],
        },
      });

      const expectedActions = [
        { type: types.CLEAR_COMPLETED_REQUEST },
        { type: types.CLEAR_COMPLETED_FAILURE, error: errorMessage },
      ];

      api.deleteTodo.mockImplementation(() => {
        throw expectedError;
      });

      await store.dispatch(actions.clearCompleted());
      expect(store.getActions()).toEqual(expectedActions);
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
      const expectedActions = [
        { type: types.FETCH_TODOS_REQUEST },
        { type: types.FETCH_TODOS_SUCCESS, todos: expectedTodos },
      ];

      api.fetchTodos.mockReturnValue(expectedTodos);

      await store.dispatch(actions.fetchTodos());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create FETCH_TODOS_FAILURE when fetching todos throw an exception', async () => {
      const expectedActions = [
        { type: types.FETCH_TODOS_REQUEST },
        { type: types.FETCH_TODOS_FAILURE, error: errorMessage },
      ];

      api.fetchTodos.mockImplementationOnce(() => {
        throw expectedError;
      });

      await store.dispatch(actions.fetchTodos());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

/*
describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    const id = 'newId';
    expect(actions.addTodo('Use Redux')).toEqual({
      type: types.ADD_TODO,
      newTodo: {
        id,
        title: 'Use Redux',
        completed: false,
      },
    });
  });

  it('deleteTodo should create DELETE_TODO action', () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: types.DELETE_TODO,
      id: 1,
    });
  });

  it('editTodo should create SAVE_TODO action', () => {
    const todoToSave = {
      id: 'foo',
      title: 'Use Javascript',
      completed: false,
    };
    expect(actions.saveTodo(todoToSave, 'Use Redux everywhere')).toEqual({
      type: types.SAVE_TODO,
      todoToSave,
      title: 'Use Redux everywhere',
    });
  });

  it('completeTodo should create COMPLETE_TODO action', () => {
    expect(actions.completeTodo(1)).toEqual({
      type: types.COMPLETE_TODO,
      id: 1,
    });
  });

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAllTodos()).toEqual({
      type: types.COMPLETE_ALL_TODOS,
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED,
    });
  });
});
*/
