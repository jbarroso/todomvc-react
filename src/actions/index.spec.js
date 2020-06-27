import * as types from '../constants/ActionTypes';
import * as actions from './index';
import Utils from '../utils';

jest.mock('../utils');

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    const id = 'newId';
    Utils.uuid.mockReturnValue(id);
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
