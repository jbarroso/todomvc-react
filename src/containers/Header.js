import { connect } from 'react-redux';
import Header from '../components/Header';
import { addTodo } from '../actions';

export default connect(null, { onSave: addTodo })(Header);
