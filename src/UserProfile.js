// import React from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';
// import { setUserParameters } from '../action';
// import GardenGrid from './GardenSquareGrid/GardenGrid';

// const UserProfile = React.createClass({

//   render() {
//     return(
//       <div>
//         <div>
//           <h3>{this.props.username}</h3>
//         </div>
//         <GardenGrid component = {this.props.gardens}>
//           {this.props.gardens}
//         </GardenGrid>
//       </div>
//       )
//   }
// })

// const mapStateToProps = (state) => {
//   return {
//     username: state.username,
//     gardens: state.gardens
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {

//     dispatchUserParameters(username, gardens) {
//       dispatch(setUserParameters(username, gardens));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);