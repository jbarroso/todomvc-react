import * as types from '../constants/ActionTypes';

export const addTodo = (title) => {
  const newTodo = {
    title,
    completed: false,
  };
  return { type: types.ADD_TODO_REQUEST, newTodo };
};
export const deleteTodo = (id) => ({ type: types.DELETE_TODO_REQUEST, id });
export const saveTodo = (todoToSave, title) => ({
  type: types.SAVE_TODO_REQUEST,
  todoToSave,
  title,
});
export const completeTodo = (id) => ({ type: types.COMPLETE_TODO_REQUEST, id });
export const completeAllTodos = () => ({
  type: types.COMPLETE_ALL_TODOS_REQUEST,
});
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED_REQUEST });
export const fetchTodos = () => ({ type: types.FETCH_TODOS_REQUEST });
