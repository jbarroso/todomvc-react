import * as types from '../constants/ActionTypes';
import Utils from '../utils';

export const addTodo = (title) => {
  const newTodo = {
    id: Utils.uuid(),
    title,
    completed: false,
  };
  return { type: types.ADD_TODO, newTodo };
};
export const deleteTodo = (id) => ({ type: types.DELETE_TODO, id });
export const saveTodo = (todoToSave, title) => ({
  type: types.SAVE_TODO,
  todoToSave,
  title,
});
export const completeTodo = (id) => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
