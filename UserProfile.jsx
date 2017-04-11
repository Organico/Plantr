import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const UserProfile = React.createClass({
  // getInitialState() {
  //   // declare the state properties
  //   // this.state = {
  //   //   username: ''
  //   //   gardens: ''
  //   // }
  // },
  // componentDidMount(){
  //   this.props.dispatch(function() { //<--set state properties to get request values
  //     // perform get request
  //     // set state at username = username
  //     // set state at gardens = gardens
  //   })
  // },
  render() {
    return(
      <UserProfile>
        <div>
          {this.state.username}
        </div>
          {this.state.gardens}
      </UserProfile>
      )
  }
})

const mapStateToProps = (state) => {
  return {
    username: state.username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchSetGardenParameters(width, height, color) {
      dispatch(setGardenParameters(width, height, color));
    },
    dispatchSetGarden(dbGardenGrid) {
      dispatch(setGarden(dbGardenGrid));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);