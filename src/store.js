import { createStore } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer)

export default store;
