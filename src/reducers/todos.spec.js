import todos from './todos';
import * as types from '../constants/ActionTypes';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todos(undefined, {})).toEqual([]);
  });

  it('should handle ADD_TODO with a empty list', () => {
    const id = 'newId';

    expect(
      todos([], {
        type: types.ADD_TODO,
        newTodo: {
          title: 'Run the tests',
          completed: false,
          id,
        },
      })
    ).toEqual([
      {
        title: 'Run the tests',
        completed: false,
        id,
      },
    ]);
  });

  it('should handle ADD_TODO with a todo element', () => {
    const id = 'newId';
    expect(
      todos(
        [
          {
            title: 'Use Redux',
            completed: false,
            id: 'foo',
          },
        ],
        {
          type: types.ADD_TODO,
          newTodo: {
            title: 'Run the tests',
            completed: false,
            id,
          },
        }
      )
    ).toEqual([
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
    ]);
  });

  it('should handle DELETE_TODO', () => {
    expect(
      todos(
        [
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
        {
          type: types.DELETE_TODO,
          id: 'bar',
        }
      )
    ).toEqual([
      {
        title: 'Use Redux',
        completed: false,
        id: 'foo',
      },
    ]);
  });

  it('should handle SAVE_TODO', () => {
    const todoToSave = {
      title: 'Run the tests',
      completed: false,
      id: 'foo',
    };

    expect(
      todos(
        [
          todoToSave,
          {
            title: 'Use Redux',
            completed: false,
            id: 'bar',
          },
        ],
        {
          type: types.SAVE_TODO,
          title: 'Fix the tests',
          todoToSave,
        }
      )
    ).toEqual([
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
    ]);
  });

  it('should handle COMPLETE_TODO', () => {
    expect(
      todos(
        [
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
        {
          type: types.COMPLETE_TODO,
          id: 'foo',
        }
      )
    ).toEqual([
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
    ]);
  });

  it('should handle COMPLETE_ALL_TODOS', () => {
    expect(
      todos(
        [
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
        {
          type: types.COMPLETE_ALL_TODOS,
        }
      )
    ).toEqual([
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
    ]);

    // Unmark if all todos are currently completed
    expect(
      todos(
        [
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
        {
          type: types.COMPLETE_ALL_TODOS,
        }
      )
    ).toEqual([
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
    ]);
  });

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      todos(
        [
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
        {
          type: types.CLEAR_COMPLETED,
        }
      )
    ).toEqual([
      {
        title: 'Use Redux',
        completed: false,
        id: 'bar',
      },
    ]);
  });
});
