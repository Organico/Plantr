import { combineReducers, createStore, applyMiddleware } from 'redux';
import gardenReducer from './reducers/GardenReducer';
import userProfileReducer from './reducers/UserProfileReducer';
import weatherReducer from './reducers/WeatherReducer';
import thunk from 'redux-thunk';
import forumReducer from './reducers/forumReducer';

const rootReducer = combineReducers({
  gardenReducer,
  userProfileReducer,
  forumReducer
  weatherReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default store;
