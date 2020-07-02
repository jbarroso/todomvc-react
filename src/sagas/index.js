import { all, call, takeLatest, put, select } from 'redux-saga/effects';
import * as types from '../constants/ActionTypes';
import * as api from '../api';
import { getTodos, areAllMarked } from '../selectors';

export function* addTodo({ newTodo: { title } }) {
  try {
    const newTodo = yield call(api.addTodo, title);
    yield put({ type: types.ADD_TODO_SUCCESS, newTodo });
  } catch (e) {
    yield put({ type: types.ADD_TODO_FAILURE, error: e.message });
  }
}

export function* deleteTodo({ id }) {
  try {
    yield call(api.deleteTodo, id);
    yield put({ type: types.DELETE_TODO_SUCCESS, id });
  } catch (e) {
    yield put({ type: types.DELETE_TODO_FAILURE, error: e.message });
  }
}

export function* saveTodo({ todoToSave, title }) {
  try {
    yield call(api.updateTodo, todoToSave.id, { title });
    yield put({
      type: types.SAVE_TODO_SUCCESS,
      todoToSave,
      title,
    });
  } catch (e) {
    yield put({ type: types.SAVE_TODO_FAILURE, error: e.message });
  }
}

export function* completeTodo({ id }) {
  try {
    const todos = yield select(getTodos);
    const currentTodo = todos.find((todo) => todo.id === id);
    yield call(api.updateTodo, id, { completed: !currentTodo.completed });
    yield put({ type: types.COMPLETE_TODO_SUCCESS, id });
  } catch (e) {
    yield put({ type: types.COMPLETE_TODO_FAILURE, error: e.message });
  }
}

export function* completeAllTodos() {
  try {
    const todos = yield select(getTodos);
    const allMarked = yield select(areAllMarked);
    yield all(
      todos.map((todo) =>
        call(api.updateTodo, todo.id, { completed: !allMarked })
      )
    );
    yield put({ type: types.COMPLETE_ALL_TODOS_SUCCESS });
  } catch (e) {
    yield put({ type: types.COMPLETE_ALL_TODOS_FAILURE, error: e.message });
  }
}

export function* clearCompleted() {
  try {
    const todos = yield select(getTodos);
    const completedTodos = todos.filter((todo) => todo.completed);
    yield all(completedTodos.map((todo) => call(api.deleteTodo, todo.id)));
    yield put({ type: types.CLEAR_COMPLETED_SUCCESS });
  } catch (e) {
    yield put({ type: types.CLEAR_COMPLETED_FAILURE, error: e.message });
  }
}

export function* fetchTodos() {
  try {
    const todos = yield call(api.fetchTodos);
    yield put({ type: types.FETCH_TODOS_SUCCESS, todos });
  } catch (e) {
    yield put({ type: types.FETCH_TODOS_FAILURE, error: e.message });
  }
}

export default function* () {
  yield all([
    takeLatest(types.ADD_TODO_REQUEST, addTodo),
    takeLatest(types.DELETE_TODO_REQUEST, deleteTodo),
    takeLatest(types.SAVE_TODO_REQUEST, saveTodo),
    takeLatest(types.COMPLETE_TODO_REQUEST, completeTodo),
    takeLatest(types.COMPLETE_ALL_TODOS_REQUEST, completeAllTodos),
    takeLatest(types.CLEAR_COMPLETED_REQUEST, clearCompleted),
    takeLatest(types.FETCH_TODOS_REQUEST, fetchTodos),
  ]);
}
