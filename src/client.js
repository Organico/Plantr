import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home'
import '../public/style.css'
import axios from 'axios'
import store from './store'
import {Provider} from 'react-redux'
import Todo from './Todo'
import { addTodo } from './action'
import Knight from './Knight';
import GardenSquare from './GardenSquare.js'
import Garden from './Garden.js'


const App = React.createClass({
  getInitialState () {
    return this.state = store.getState();
  },

  componentDidMount () {
    axios.get('http://localhost:3000/api/todos/')
        .then((res) => {
          store.dispatch(addTodo(res.data));
        })
        .catch((error) => console.error('axios error', error));
  },
  render () {
    return (
        <Provider store={store}>
        <div>
          <div className="container">
            <h1 className="text-center">To Do List</h1>
            <Home/>
            <Todo />
          </div>
          <Garden location={[1,1]} />
        </div>

        </Provider>
    )
  }
});

ReactDOM.render(<App />,
    document.getElementById('app')
);