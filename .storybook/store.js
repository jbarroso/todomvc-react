import { createStore } from 'redux';
import withReduxEnhancer from 'addon-redux/enhancer'
import initialState from '../src/reducers/initialState';

export default createStore((state = initialState, _) => state, withReduxEnhancer);
