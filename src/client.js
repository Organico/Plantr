import AboutUs from './About/AboutUs'
import AuthService from './config/AuthService.js';
import Forum from './Forum/Forum';
import GardenSquareGridView from './GardenSquareGrid/getGardenSquareGrid';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home/Home'
import Login from './config/Login.js';
import MakeGardenSquareGridView from './GardenSquareGrid/makeGardenSquareGrid';
import NavBar from './NavBar';
import Profile from './userProfile/Profile';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';

const auth = new AuthService('vBOwXk8xIgy3kroSs5vz1TFfrYyFQNFf', 'skebaish1992.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
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

  renderComponents() {
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
              </div>
            </div>
          </Router>
        </Provider>
        );
      }
    }

  render() {
    return (
      <div>
        {this.renderComponents()}
      </div>
    )
  }
};

export default auth;

ReactDOM.render(<App />,
    document.getElementById('app')
);
