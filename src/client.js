import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
import axios from 'axios';
import Home from './Home/Home'
import store from './store';
import {Provider} from 'react-redux';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import Login from './config/Login.js';
import AuthService from './config/AuthService.js';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import GardenSquareGridView from './GardenSquareGrid/getGardenSquareGrid';
import MakeGardenSquareGridView from './GardenSquareGrid/makeGardenSquareGrid';
import GardenCubeGridView from './GardenCubeGrid/getGardenCubeGrid';
import Layout from './Layout';
import Test from './Test';
import Navigation from './Navigation';
import Profile from './Profile';
import NavBar from './NavBar';
import MyCubeView from './simpleSpin/index';
import Forum from './Forum/Forum';
// <Route path="/userprofile" component={UserProfile}></Route>
const auth = new AuthService('vBOwXk8xIgy3kroSs5vz1TFfrYyFQNFf', 'skebaish1992.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  console.log('nextState', nextState)
  if (!auth.loggedIn()) {
    console.log("Not logged in!")
    replace({ pathname: '/' });
  }
};


const App = React.createClass({

  render () {
    const { dispatch, isAuthenticated, errorMessage} = this.props;
    // console.log("The profile is", auth.getProfile(auth.idToken));
    // console.log("The toke is ", auth.idToken);
    console.dir(auth.getProfile)

    if (!auth.loggedIn()) {
            return (
                <div>
                    <Login auth={auth}/>
                </div>
            );
          } else {
    return (
        <Provider store={store}>
            <Router>
              <div>

                <NavBar />

                <Route exact path="/" component={Layout}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/plant" component={MyCubeView}></Route>
                <Route path="/layout" component={Layout}></Route>
                <Route path="/cubes" component={GardenCubeGridView}></Route>
                <Route path="/squares" component={GardenSquareGridView}></Route>
                <Route path="/creategarden" component={MakeGardenSquareGridView}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/forum" component={Forum}></Route>


              </div>
            </Router>
        </Provider>
    );
  }
}
});

export default auth;

ReactDOM.render(<App />,
    document.getElementById('app')
);