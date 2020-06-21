import { connect } from 'react-redux';
import { clearCompleted } from '../actions';
import Footer from '../components/Footer';
import { getCompletedTodoCount, getTodosCount } from '../selectors';

const mapStateToProps = (state) => ({
  count: getTodosCount(state),
  completedCount: getCompletedTodoCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClearCompleted: () => dispatch(clearCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
