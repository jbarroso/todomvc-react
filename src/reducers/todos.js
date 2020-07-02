import {
  FETCH_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  SAVE_TODO_SUCCESS,
  COMPLETE_TODO_SUCCESS,
  COMPLETE_ALL_TODOS_SUCCESS,
  CLEAR_COMPLETED_SUCCESS,
} from '../constants/ActionTypes';

import { areAllMarked } from '../selectors';

import initialState from './initialState';

export default function todos(state = initialState, action) {
  const actionRequest =
    action.type && action.type.endsWith('REQUEST') ? action.type : '';
  const actionFailure =
    action.type && action.type.endsWith('FAILURE') ? action.type : '';

  switch (action.type) {
    case actionRequest:
      return {
        ...state,
        loading: true,
      };
    case actionFailure:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: [
          ...state.todos,
          {
            ...action.newTodo,
          },
        ],
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case SAVE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo) =>
          todo === action.todoToSave ? { ...todo, title: action.title } : todo
        ),
      };

    case COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case COMPLETE_ALL_TODOS_SUCCESS: {
      const completed = !areAllMarked({ todos: state });
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo) => ({
          ...todo,
          completed,
        })),
      };
    }

    case CLEAR_COMPLETED_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.filter((todo) => todo.completed === false),
      };

    default:
      return state;
  }
}
