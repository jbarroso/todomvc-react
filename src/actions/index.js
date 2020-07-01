import * as types from '../constants/ActionTypes';
import * as api from '../api';
import { getTodos, areAllMarked } from '../selectors';

export const addTodo = (title) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_TODO_REQUEST });
    const newTodo = await api.addTodo(title);
    dispatch({ type: types.ADD_TODO_SUCCESS, newTodo });
  } catch (e) {
    dispatch({ type: types.ADD_TODO_FAILURE, error: e.message });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_TODO_REQUEST });
    await api.deleteTodo(id);
    dispatch({ type: types.DELETE_TODO_SUCCESS, id });
  } catch (e) {
    dispatch({ type: types.DELETE_TODO_FAILURE, error: e.message });
  }
};

export const saveTodo = (todoToSave, title) => async (dispatch) => {
  try {
    dispatch({ type: types.SAVE_TODO_REQUEST });
    await api.updateTodo(todoToSave.id, { title });
    dispatch({
      type: types.SAVE_TODO_SUCCESS,
      todoToSave,
      title,
    });
  } catch (e) {
    dispatch({ type: types.SAVE_TODO_FAILURE, error: e.message });
  }
};

export const completeTodo = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.COMPLETE_TODO_REQUEST });
    const todos = getTodos(getState());
    const currentTodo = todos.find((todo) => todo.id === id);
    await api.updateTodo(id, { completed: !currentTodo.completed });
    dispatch({ type: types.COMPLETE_TODO_SUCCESS, id });
  } catch (e) {
    dispatch({ type: types.COMPLETE_TODO_FAILURE, error: e.message });
  }
};

export const completeAllTodos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.COMPLETE_ALL_TODOS_REQUEST });
    const todos = getTodos(getState());
    const completed = !areAllMarked(getState());
    const promises = todos.map(async (todo) =>
      api.updateTodo(todo.id, { completed })
    );
    await Promise.all(promises);
    dispatch({ type: types.COMPLETE_ALL_TODOS_SUCCESS });
  } catch (e) {
    dispatch({ type: types.COMPLETE_ALL_TODOS_FAILURE, error: e.message });
  }
};

export const clearCompleted = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.CLEAR_COMPLETED_REQUEST });
    const todos = getTodos(getState());
    const completedTodos = todos.filter((todo) => todo.completed);
    const promises = completedTodos.map(async (todo) =>
      api.deleteTodo(todo.id)
    );
    await Promise.all(promises);
    dispatch({ type: types.CLEAR_COMPLETED_SUCCESS });
  } catch (e) {
    dispatch({ type: types.CLEAR_COMPLETED_FAILURE, error: e.message });
  }
};

export const fetchTodos = () => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_TODOS_REQUEST });
    const todos = await api.fetchTodos();
    dispatch({ type: types.FETCH_TODOS_SUCCESS, todos });
  } catch (e) {
    dispatch({ type: types.FETCH_TODOS_FAILURE, error: e.message });
  }
};
