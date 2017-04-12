import { createStore } from 'redux';
import rootReducer from './reducers/RootReducer';
import gardenReducer from './reducers/GardenReducer';
import userProfileReducer from './reducers/UserProfileReducer';
import thunk from 'redux-thunk';



const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store;
