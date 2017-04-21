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
import Profile from './userProfile/Profile';
import NavBar from './NavBar';



import MyCubeView from './SimpleSpin/index';
import Forum from './Forum/Forum';
// <Route path="/userprofile" component={UserProfile}></Route>
import Weather from './weather/Weather'
const auth = new AuthService('vBOwXk8xIgy3kroSs5vz1TFfrYyFQNFf', 'skebaish1992.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  console.log('nextState', nextState)
  if (!auth.loggedIn()) {
    console.log("Not logged in!")
    replace({ pathname: '/' });
  }
};


class App extends Component {
  constructor() {
    super()
    this.state = {
      profile: ''
    }
    auth.on('profile_updated', (profile) => {
      this.setState({profile: profile});
    })
  }

  componentDidMount() {
    this.setState({profile: auth.loggedIn()});
  }

  render () {
    const { dispatch, isAuthenticated, errorMessage} = this.props;

    if (!this.state.profile) {
            return (
                <div>
                    <Login auth={auth}/>
                </div>
            );
          } else {
    return (
        <Provider store={store}>
            <Router>
              <div className="container site">
              <div className="spacer"></div>
                <div className="row test" id="navBarHolder">


                  <div className="col-md-10 offset-md-3 test">
                    <NavBar />
                  </div>
                </div>

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
                <Route path="/weather" component={Weather}></Route>


              </div>
            </Router>
        </Provider>
    );
  }
}
};

export default auth;

ReactDOM.render(<App />,
    document.getElementById('app')
);