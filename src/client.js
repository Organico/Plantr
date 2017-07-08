import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
import axios from 'axios';
import Home from './Home/Home'
import store from './store';
import { Provider } from 'react-redux';
import { Layer, Rect, Circle, Stage, Group } from 'react-konva';
import Login from './config/Login.js';
import AuthService from './config/AuthService.js';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import GardenSquareGridView from './GardenSquareGrid/getGardenSquareGrid';
import MakeGardenSquareGridView from './GardenSquareGrid/makeGardenSquareGrid';
import Profile from './userProfile/Profile';
import NavBar from './NavBar';
import Forum from './Forum/Forum';
import Weather from './weather/Weather'
const auth = new AuthService('vBOwXk8xIgy3kroSs5vz1TFfrYyFQNFf', 'skebaish1992.auth0.com');
import VRScene from './AframeTest/VRScene'
import AboutUs from './About/AboutUs'



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
                    <Login profile={this.state.profile} auth={auth}/>
                </div>
            );
          } else {
    return (
        <Provider store={store}>
            <Router>
              <div>
                <NavBar />
                <div className="container-fluid">
                  <Route exact path="/" component={Home}></Route>
                  <Route path="/home" component={Home}></Route>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/about" component={AboutUs}></Route>
                  <Route path="/squares" component={GardenSquareGridView}></Route>
                  <Route path="/creategarden" component={MakeGardenSquareGridView}></Route>
                  <Route path="/profile" component={Profile}></Route>
                  <Route path="/forum" component={Forum}></Route>
                  <Route path="/weather" component={Weather}></Route>
                </div>
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
