import { createSelector } from 'reselect';
import {
  ALL_TODOS,
  COMPLETED_TODOS,
  ACTIVE_TODOS,
} from '../constants/TodoFilters';

const getVisibilityFilter = (state, { nowShowing = ALL_TODOS }) => nowShowing;

const getTodos = (state) => state.todos;

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case ALL_TODOS:
        return todos;
      case COMPLETED_TODOS:
        return todos.filter((t) => t.completed);
      case ACTIVE_TODOS:
        return todos.filter((t) => !t.completed);
      default:
        throw new Error(`Unknown filter: ${visibilityFilter}`);
    }
  }
);

export const getCompletedTodoCount = createSelector([getTodos], (todos) =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
);

export const getTodosCount = (state) => getTodos(state).length;
export const getActiveTodoCount = (state) =>
  getTodosCount(state) - getCompletedTodoCount(state);
