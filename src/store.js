import { combineReducers, createStore } from 'redux';
import gardenReducer from './reducers/GardenReducer';
import userProfileReducer from './reducers/UserProfileReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  gardenReducer,
  userProfileReducer
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;
