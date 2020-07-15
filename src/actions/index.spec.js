import * as types from '../constants/ActionTypes';
import * as actions from './index';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO_REQUEST action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: types.ADD_TODO_REQUEST,
      newTodo: {
        title: 'Use Redux',
        completed: false,
      },
    });
  });

  it('deleteTodo should create DELETE_TODO_REQUEST action', () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: types.DELETE_TODO_REQUEST,
      id: 1,
    });
  });

  it('editTodo should create SAVE_TODO_REQUEST action', () => {
    const todoToSave = {
      id: 'foo',
      title: 'Use Javascript',
      completed: false,
    };
    expect(actions.saveTodo(todoToSave, 'Use Redux everywhere')).toEqual({
      type: types.SAVE_TODO_REQUEST,
      todoToSave,
      title: 'Use Redux everywhere',
    });
  });

  it('completeTodo should create COMPLETE_TODO_REQUEST action', () => {
    expect(actions.completeTodo(1)).toEqual({
      type: types.COMPLETE_TODO_REQUEST,
      id: 1,
    });
  });

  it('completeAll should create COMPLETE_ALL_TODOS_REQUEST action', () => {
    expect(actions.completeAllTodos()).toEqual({
      type: types.COMPLETE_ALL_TODOS_REQUEST,
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED_REQUEST action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED_REQUEST,
    });
  });

  it('fetchTodos should create FETCH_TODOS_REQUEST action', () => {
    expect(actions.fetchTodos()).toEqual({
      type: types.FETCH_TODOS_REQUEST,
    });
  });
});
