const auth = new AuthService('vBOwXk8xIgy3kroSs5vz1TFfrYyFQNFf', 'skebaish1992.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    console.log("Not logged in!")
    replace({ pathname: '/' });
  }
};


const App = React.createClass({

  render () {
    const { dispatch, isAuthenticated, errorMessage} = this.props;
    console.log("The profile is", auth.getProfile(auth.idToken));
    console.log("The toke is ", auth.idToken);

    return (
        <Provider store={store}>
            <Router>
              <div>

                <NavBar />
                <Switch>
                  <Route path="/home" component={Home}></Route>
                  <Route path="/login" component={Login}></Route>
                  <Route render={(props)=>{
                    if (!auth.loggedIn()) {
                      return (
                          <div>
                              <Login auth={auth}/>
                          </div>
                      );
                    } else {
                      return (<Authorize / >)
                    }
                  }} />
                <Switch>
              </div>
            </Router>
        </Provider>
    );
  }
}
});
const Authorize = (props) =>
  (<Route exact path="/" component={Layout}></Route>
              <Route path="/test" component={MyCubeView}></Route>
              <Route path="/layout" component={Layout}></Route>
              <Route path="/cubes" component={GardenCubeGridView}></Route>
              <Route path="/squares" component={GardenSquareGridView}></Route>
              <Route path="/creategarden" component={MakeGardenSquareGridView}></Route>
              <Route path="/profile" component={Profile}></Route>)


ReactDOM.render(<App />,
    document.getElementById('app')
);