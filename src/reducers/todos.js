import {
  ADD_TODO,
  DELETE_TODO,
  SAVE_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
} from '../constants/ActionTypes';

const initialState = [];

const areAllMarked = (state) => state.every((todo) => todo.completed);

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          ...action.newTodo,
        },
      ];

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case SAVE_TODO:
      return state.map((todo) =>
        todo === action.todoToSave ? { ...todo, title: action.title } : todo
      );

    case COMPLETE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case COMPLETE_ALL_TODOS:
      return state.map((todo) => ({
        ...todo,
        completed: !areAllMarked(state),
      }));

    case CLEAR_COMPLETED:
      return state.filter((todo) => todo.completed === false);

    default:
      return state;
  }
}
