import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import 'todomvc-app-css/index.css';

import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

import {
  getCompletedTodoCount,
  getActiveTodoCount,
  getTodosCount,
} from '../selectors';
import { fetchTodos } from '../actions';

import * as types from '../constants/TodoFilters';

const App = ({ nowShowing }) => {
  const todosCount = useSelector(getTodosCount);
  const activeTodoCount = useSelector(getActiveTodoCount);
  const completedCount = useSelector(getCompletedTodoCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <section className="todoapp">
      <div>
        <Header />
        {!!todosCount && <MainSection nowShowing={nowShowing} />}
        {!!(activeTodoCount || completedCount) && <Footer />}
      </div>
    </section>
  );
};

App.defaultProps = {
  nowShowing: types.ALL_TODOS,
};

App.propTypes = {
  nowShowing: PropTypes.oneOf([
    types.ALL_TODOS,
    types.ACTIVE_TODOS,
    types.COMPLETED_TODOS,
  ]),
};

export default App;
