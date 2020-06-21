import { connect } from 'react-redux';
import {
  completeAllTodos,
  completeTodo,
  deleteTodo,
  saveTodo,
} from '../actions';
import MainSection from '../components/MainSection';
import {
  getCompletedTodoCount,
  getActiveTodoCount,
  getVisibleTodos,
} from '../selectors';

const mapStateToProps = (state, props) => {
  return {
    activeTodoCount: getActiveTodoCount(state),
    filteredTodos: getVisibleTodos(state, props),
    completedCount: getCompletedTodoCount(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggleAll: () => dispatch(completeAllTodos()),
  onToggle: ({ id }) => dispatch(completeTodo(id)),
  onDestroy: ({ id }) => dispatch(deleteTodo(id)),
  onSave: (todoToSave, title) => dispatch(saveTodo(todoToSave, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
