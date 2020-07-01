import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'todomvc-app-css/index.css';

import Header from '../containers/Header';
import MainSection from '../containers/MainSection';
import Footer from '../containers/Footer';

import * as types from '../constants/TodoFilters';

class App extends Component {
  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos();
  }

  render() {
    const {
      todosCount,
      activeTodoCount,
      completedCount,
      nowShowing,
    } = this.props;
    return (
      <section className="todoapp">
        <div>
          <Header />
          {!!todosCount && <MainSection nowShowing={nowShowing} />}
          {!!(activeTodoCount || completedCount) && <Footer />}
        </div>
      </section>
    );
  }
}

App.defaultProps = {
  nowShowing: types.ALL_TODOS,
};

App.propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  nowShowing: PropTypes.oneOf([
    types.ALL_TODOS,
    types.ACTIVE_TODOS,
    types.COMPLETED_TODOS,
  ]),
  todosCount: PropTypes.number.isRequired,
  activeTodoCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
};

export default App;
