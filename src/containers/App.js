import { connect } from 'react-redux';
import App from '../components/App';
import {
  getCompletedTodoCount,
  getActiveTodoCount,
  getTodosCount,
} from '../selectors';

const mapStateToProps = (state, { nowShowing }) => ({
  todosCount: getTodosCount(state),
  activeTodoCount: getActiveTodoCount(state),
  completedCount: getCompletedTodoCount(state),
  nowShowing,
});

export default connect(mapStateToProps)(App);
