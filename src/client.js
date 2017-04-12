import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import '../public/style.css';
import axios from 'axios';
// import Plant from './Plant';
import store from './store';
import {Provider} from 'react-redux';
import { addTodo } from './action';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import Login from './Login.js';
import AuthService from './config/AuthService.js';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import GardenSquareGridView from './GardenSquareGrid/getGardenSquareGrid';
import MakeGardenSquareGridView from './GardenSquareGrid/makeGardenSquareGrid';
import GardenCubeGridView from './GardenCubeGrid/getGardenCubeGrid';
import Layout from './Layout'
import Test from './Test'
import Navigation from './Navigation';
// import UserProfile from './UserProfile';
// <Route path="/userprofile" component={UserProfile}></Route>


const App = React.createClass({

  render () {
    const { dispatch, isAuthenticated, errorMessage} = this.props;
    return (
        <Provider store={store}>
            <Router>
              <div>
                <Navigation />

                <Route exact path="/" component={Layout}></Route>
                <Route path="/test" component={Test}></Route>
                <Route path="/layout" component={Layout}></Route>
                <Route path="/cubes" component={GardenCubeGridView}></Route>
                <Route path="/squares" component={GardenSquareGridView}></Route>
                <Route path="/creategarden" component={MakeGardenSquareGridView}></Route>


              </div>
            </Router>
        </Provider>
    );
  }
});

ReactDOM.render(<App />,
    document.getElementById('app')
);