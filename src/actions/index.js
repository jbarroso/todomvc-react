import * as types from '../constants/ActionTypes';

export const addTodo = (title) => ({ type: types.ADD_TODO, title });
export const deleteTodo = (id) => ({ type: types.DELETE_TODO, id });
export const saveTodo = (todoToSave, title) => ({
  type: types.SAVE_TODO,
  todoToSave,
  title,
});
export const completeTodo = (id) => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
