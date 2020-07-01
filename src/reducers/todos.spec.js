import todos from './todos';
import * as types from '../constants/ActionTypes';
import initialState from './initialState';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todos(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_TODO_SUCCESS with a empty list', () => {
    const id = 'newId';

    expect(
      todos(initialState, {
        type: types.ADD_TODO_SUCCESS,
        newTodo: {
          title: 'Run the tests',
          completed: false,
          id,
        },
      })
    ).toEqual({
      ...initialState,
      todos: [
        ...initialState.todos,
        {
          title: 'Run the tests',
          completed: false,
          id,
        },
      ],
    });
  });

  it('should handle ADD_TODO_SUCCESS with a todo element', () => {
    const id = 'newId';
    expect(
      todos(
        {
          todos: [
            {
              title: 'Use Redux',
              completed: false,
              id: 'foo',
            },
          ],
        },
        {
          type: types.ADD_TODO_SUCCESS,
          newTodo: {
            title: 'Run the tests',
            completed: false,
            id,
          },
        }
      )
    ).toEqual({
      loading: false,
      todos: [
        {
          title: 'Use Redux',
          completed: false,
          id: 'foo',
        },
        {
          title: 'Run the tests',
          completed: false,
          id,
        },
      ],
    });
  });

  it('should handle DELETE_TODO_SUCCESS', () => {
    expect(
      todos(
        {
          todos: [
            {
              title: 'Use Redux',
              completed: false,
              id: 'foo',
            },
            {
              title: 'Run the tests',
              completed: false,
              id: 'bar',
            },
          ],
        },

        {
          type: types.DELETE_TODO_SUCCESS,
          id: 'bar',
        }
      )
    ).toEqual({
      loading: false,
      todos: [
        {
          title: 'Use Redux',
          completed: false,
          id: 'foo',
        },
      ],
    });
  });

  it('should handle SAVE_TODO_SUCCESS', () => {
    const todoToSave = {
      title: 'Run the tests',
      completed: false,
      id: 'foo',
    };

    expect(
      todos(
        {
          todos: [
            todoToSave,
            {
              title: 'Use Redux',
              completed: false,
              id: 'bar',
            },
          ],
        },
        {
          type: types.SAVE_TODO_SUCCESS,
          title: 'Fix the tests',
          todoToSave,
        }
      )
    ).toEqual({
      loading: false,
      todos: [
        {
          title: 'Fix the tests',
          completed: false,
          id: 'foo',
        },
        {
          title: 'Use Redux',
          completed: false,
          id: 'bar',
        },
      ],
    });
  });

  it('should handle COMPLETE_TODO_SUCCESS', () => {
    expect(
      todos(
        {
          todos: [
            {
              title: 'Run the tests',
              completed: false,
              id: 'foo',
            },
            {
              title: 'Use Redux',
              completed: false,
              id: 'bar',
            },
          ],
        },
        {
          type: types.COMPLETE_TODO_SUCCESS,
          id: 'foo',
        }
      )
    ).toEqual({
      loading: false,
      todos: [
        {
          title: 'Run the tests',
          completed: true,
          id: 'foo',
        },
        {
          title: 'Use Redux',
          completed: false,
          id: 'bar',
        },
      ],
    });
  });

  it('should handle COMPLETE_ALL_TODOS_SUCCESS', () => {
    expect(
      todos(
        {
          todos: [
            {
              title: 'Run the tests',
              completed: true,
              id: 'foo',
            },
            {
              title: 'Use Redux',
              completed: false,
              id: 'bar',
            },
          ],
        },
        {
          type: types.COMPLETE_ALL_TODOS_SUCCESS,
        }
      )
    ).toEqual({
      loading: false,
      todos: [
        {
          title: 'Run the tests',
          completed: true,
          id: 'foo',
        },
        {
          title: 'Use Redux',
          completed: true,
          id: 'bar',
        },
      ],
    });

    // Unmark if all todos are currently completed
    expect(
      todos(
        {
          todos: [
            {
              title: 'Run the tests',
              completed: true,
              id: 'foo',
            },
            {
              title: 'Use Redux',
              completed: true,
              id: 'bar',
            },
          ],
        },
        {
          type: types.COMPLETE_ALL_TODOS_SUCCESS,
        }
      )
    ).toEqual({
      loading: false,
      todos: [
        {
          title: 'Run the tests',
          completed: false,
          id: 'foo',
        },
        {
          title: 'Use Redux',
          completed: false,
          id: 'bar',
        },
      ],
    });
  });

  it('should handle CLEAR_COMPLETED_SUCCESS', () => {
    expect(
      todos(
        {
          todos: [
            {
              title: 'Run the tests',
              completed: true,
              id: 'foo',
            },
            {
              title: 'Use Redux',
              completed: false,
              id: 'bar',
            },
          ],
        },
        {
          type: types.CLEAR_COMPLETED_SUCCESS,
        }
      )
    ).toEqual({
      loading: false,
      todos: [
        {
          title: 'Use Redux',
          completed: false,
          id: 'bar',
        },
      ],
    });
  });
});
