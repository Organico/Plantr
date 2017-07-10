import React, { Component } from 'react';
import GardenSquareGridView from '../GardenSquareGrid/getGardenSquareGrid';
import {setSuggestedPlants, setSuggestedGarden, setDropdownStatus} from '../Actions/GardenActions.js';

import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import IndividualGarden from './IndividualGarden';
import IndividualGardenInfo from './IndividualGardenInfo';
import axios from 'axios';
import { setPosts } from '../Actions/ForumActions';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import PlantGrid from '../GardenSquareGrid/PlantGrid';
import GardenGrid from '../GardenSquareGrid/GardenGrid';


let userGardens = [];
var context;
var gardenName = "";
class RecentGardens extends Component {
  constructor() {
    super()
      this.state = {
        gardenGrid: [],
        plantGrid: [],
        dropdownStatus: false
      }
  }

  toggleDropDown(ref) {
    console.log('toggleDropDown is being toggled');
    console.log("THIS IS ", this)
    console.log("the plant grid is ", this.plantGrid);
    console.log("the garden grid is ", dispatchSetSuggestedPlants(newPlantGrid))
    // this.setState({dropDownStatus: !.dropDownStatus});
  }

  handleClick(str){
      console.log("here, let's try this. this is the e", str);
      console.log("here is this ", this)
      this.context.props.dispatchSetSuggestedPlants(this.plantGrid);
      this.context.props.dispatchSetSuggestedGarden(this.gardenGrid);
      console.log("Inside of handle click of recent gardens", this)

      gardenName = this.gardenName
      this.context.props.dispatchSetDropdownStatus(this.context.props.dropdownStatus);
  }

  getUserGardens() {
    const profile = this.props.profile;
    axios.get('/api/gardens/' + profile.email).then((res) => {
      let personalGarden = res.data;
      userGardens = [];
      for (let i = 0; i < personalGarden.length; i++) {
        let gardenObj = {
          gardenGrid: personalGarden[i].gardenGrid,
          plantGrid: personalGarden[i].plantGrid,
          profileEmail: personalGarden[i].profileEmail,
          gardenName: personalGarden[i].gardenName,
          profilePicture: personalGarden[i].profilePicture
        }
        userGardens.push(gardenObj);
      }
    }).catch((err) => {
      console.error("There was a get request error on the client in User RecentGardens", err);
    });
  }

  componentDidMount() {
    this.getUserGardens();
  }

  render() {
    const profile = this.props.profile;
    const context = this;

    return (
      <div className="row">
        <div className="col-md-12 offset-md-2 right userGarden">
          <div className="userGardenSpan">
            <h3>Recent Gardens</h3>
            {!this.props.dropdownStatus ? (
              <div>
              { userGardens.map((garden, i) => {
                  return <div>
                    <IndividualGardenInfo gardenName={garden.gardenName} nickname={profile.nickname} profilePicture={garden.profilePicture} ref={i} onClick={this.handleClick} context={context} gardenGrid={garden.gardenGrid} plantGrid={garden.plantGrid}/>
                    </div>
                  }
              )}</div>
                ) : (

      <div className="container-fluid">
               <h4>{gardenName}</h4>

        <div className="row">
          <div className="col-md-2">
            <div className="row"></div>

              <div className="col-md-12 offset-md-3 postPicture" style={profilePic}>
              </div>
              <div className="row">
                <div className="col-md-12 postUsername">{ this.props.nickname }
                </div>
              </div>
            </div>
            <h2></h2>
            <div>
            <button onClick={() => {
                    this.props.dispatchSetDropdownStatus(this.props.dropdownStatus);}}>Go Back to your Garden</button></div>
            <div className="row" onClick={ () => {this.handleClick}}>
              <div className="col-mid-10 gardenName">
                <div className="row">
                <Stage width={500} height={500} fill="white" stroke="black" className="text-center">
                  <GardenGrid />
                  <PlantGrid />
                </Stage>
                </div>
              </div>
            </div>
        </div>
      </div>)}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
    currentPost: state.forumReducer.currentPost,
    dropdownStatus: state.gardenReducer.dropdownStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    },
    dispatchSetSuggestedGarden(suggestedGarden){
      dispatch(setSuggestedGarden(suggestedGarden))
    },
    dispatchSetSuggestedPlants(suggestedPlants){
      dispatch(setSuggestedPlants(suggestedPlants))
    },
    dispatchSetDropdownStatus(dropdownStatus){
      dispatch(setDropdownStatus(dropdownStatus))
    }
  };
};
            // <GardenSquareGridView />

export default connect(mapStateToProps, mapDispatchToProps)(RecentGardens);
// import axios from 'axios';
// import { connect } from 'react-redux';
// import GardenGrid from '../GardenSquareGrid/GardenGrid';
// import IndividualGardenInfo from './IndividualGardenInfo';
// import PlantGrid from '../GardenSquareGrid/PlantGrid';
// import React, { Component } from 'react';
// import { setPosts } from '../Actions/ForumActions';
// import { setSuggestedPlants, setSuggestedGarden, setDropdownStatus} from '../Actions/GardenActions.js';
// import { Stage } from 'react-konva';



// var context;
// var gardenName = "";
// class RecentGardens extends Component {
//   constructor() {
//     super()
//       this.state = {
//         gardenGrid: [],
//         plantGrid: [],
//         dropdownStatus: false,
//         userGardens: []
//       }
//   }

//   toggleDropDown(ref) {
//     // this.setState({dropDownStatus: !.dropDownStatus});
//   }

//   handleClick(){
//     this.context.props.dispatchSetSuggestedPlants(this.plantGrid);
//     this.context.props.dispatchSetSuggestedGarden(this.gardenGrid);

//     gardenName = this.gardenName
//     this.context.props.dispatchSetDropdownStatus(this.context.props.dropdownStatus);
//   }

//   getUserGardens() {
//     const profile = this.props.profile;
//     axios.get('/api/gardens/' + profile.email).then((res) => {
//       let personalGarden = res.data;
//       for (let i = 0; i < personalGarden.length; i++) {
//         let gardenObj = {
//           gardenGrid: personalGarden[i].gardenGrid,
//           plantGrid: personalGarden[i].plantGrid,
//           profileEmail: personalGarden[i].profileEmail,
//           gardenName: personalGarden[i].gardenName,
//           profilePicture: personalGarden[i].profilePicture
//         }
//         this.state.userGardens.push(gardenObj)
//         this.setState({userGardens: this.state.userGardens});
//       }
//     }).catch((err) => {
//       console.error("There was a get request error on the client in User RecentGardens", err);
//     });
//   }

//   componentDidMount() {
//     this.getUserGardens();
//   }

//   renderPreviewGarden() {
//     this.state.userGardens.map((garden, i) => {
//         return (
//         <div>
//          <IndividualGardenInfo
//              context={context}
//              gardenGrid={garden.gardenGrid}
//              gardenName={garden.gardenName}
//              nickname={profile.nickname}
//              onClick={this.handleClick}
//              plantGrid={garden.plantGrid}
//              profilePicture={garden.profilePicture}
//              ref={i}
//            />
//           </div>
//         )
//       }
//     )
//   }

//   render() {
//     const profile = this.props.profile;
//     const context = this;

//     return (
//       <div className="row">
//         <div className="col-md-12 offset-md-2 right userGarden">
//           <div className="userGardenSpan">
//             <h3>Recent Gardens</h3>
//             {!this.props.dropdownStatus ? (
//               <div>
//               { this.renderPreviewGarden }
//               </div>
//                 ) : (
//               <div className="container-fluid">
//                 <h4>{gardenName}</h4>
//                 <div className="row">
//                   <div className="col-md-2">
//                     <div className="row"></div>
//                       <div className="col-md-12 offset-md-3 postPicture" style={profilePic}>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-12 postUsername">{ this.props.nickname }
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <button onClick={() => {
//                             this.props.dispatchSetDropdownStatus(this.props.dropdownStatus);}}>Go Back to your Garden</button>
//                     </div>
//                     <div className="row" onClick={ () => {this.handleClick}}>
//                       <div className="col-mid-10 gardenName">
//                         <div className="row">
//                           <Stage width={500} height={500} fill="white" stroke="black" className="text-center">
//                             <GardenGrid />
//                             <PlantGrid />
//                           </Stage>
//                         </div>
//                       </div>
//                     </div>
//                 </div>
//               </div>
//               )}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     posts: state.forumReducer.posts,
//     currentPost: state.forumReducer.currentPost,
//     dropdownStatus: state.gardenReducer.dropdownStatus
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatchSetPost(message) {
//       dispatch(setPosts(message));
//     },
//     dispatchSetSuggestedGarden(suggestedGarden){
//       dispatch(setSuggestedGarden(suggestedGarden))
//     },
//     dispatchSetSuggestedPlants(suggestedPlants){
//       dispatch(setSuggestedPlants(suggestedPlants))
//     },
//     dispatchSetDropdownStatus(dropdownStatus){
//       dispatch(setDropdownStatus(dropdownStatus))
//     }
//   };
// };
//             // <GardenSquareGridView />

// export default connect(mapStateToProps, mapDispatchToProps)(RecentGardens);

// NEED TO SORT OUT FUNCTIONALITY
/*

var context;
class RecentGardens extends Component {
  constructor() {
    super()
      this.state = {
        dropdownStatus: false,
        gardenGrid: [],
        gardenName: '',
        plantGrid: [],
        userGardens: []
      }
  }

  getUserGardens() {
    const profile = this.props.profile;
    axios.get('/api/gardens/' + profile.email).then((res) => {
      let personalGarden = res.data;
      console.log('HERE IS THE PERSONALGARDEN: ', personalGarden)
      for (let i = 0; i < personalGarden.length; i++) {
        let gardenObj = {
          gardenGrid: personalGarden[i].gardenGrid,
          plantGrid: personalGarden[i].plantGrid,
          profileEmail: personalGarden[i].profileEmail,
          gardenName: personalGarden[i].gardenName,
          profilePicture: personalGarden[i].profilePicture
        }
        console.log('here is the state before: ', this.state.userGardens)
        this.state.userGardens.push(gardenObj)
        this.setState({userGardens: this.state.userGardens});
        console.log('here is the state after: ', this.state.userGardens)
      }
    }).catch((err) => {
      console.error("There was a get request error on the client in User RecentGardens", err);
    });
  }

  componentDidMount() {
    this.getUserGardens();
  }

  render() {
    const profile = this.props.profile;
    const context = this;
    return (
      <div className="row">
        <div className="col-md-12 offset-md-2 right userGarden">
          <div className="userGardenSpan">
            <h3>Recent Gardens</h3>
            {!this.props.dropdownStatus ? (
              <div>
              { this.state.userGardens.map((garden, i) => {
                  return (
                    <div>
                      <IndividualGardenInfo
                        context={context}
                        gardenGrid={garden.gardenGrid}
                        gardenName={garden.gardenName}
                        nickname={profile.nickname}
                        onClick={this.handleClick}
                        plantGrid={garden.plantGrid}
                        profilePicture={garden.profilePicture}
                        ref={i}
                      />
                    </div>
                    )
                  })
                }
              </div>
              ) : (
              <div className="container-fluid">
                <h4>{this.state.gardenName}</h4>
                <div className="row">
                  <div className="col-md-2">
                    <div className="row"></div>

                      <div className="col-md-12 offset-md-3 postPicture" style={profilePic}>
                      </div>
                      <div className="row">
                        <div className="col-md-12 postUsername">{ this.props.nickname }
                        </div>
                      </div>
                    </div>
                    <h2></h2>
                    <div>
                    <button onClick={() => {
                            this.props.dispatchSetDropdownStatus(this.props.dropdownStatus);}}>Go Back to your Garden</button></div>
                    <div className="row" onClick={ () => {this.handleClick}}>
                      <div className="col-mid-10 gardenName">
                        <div className="row">
                        <Stage width={500} height={500} fill="white" stroke="black" className="text-center">
                          <GardenGrid />
                          <PlantGrid />
                        </Stage>
                        </div>
                      </div>
                    </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
    currentPost: state.forumReducer.currentPost,
    dropdownStatus: state.gardenReducer.dropdownStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    },
    dispatchSetSuggestedGarden(suggestedGarden){
      dispatch(setSuggestedGarden(suggestedGarden))
    },
    dispatchSetSuggestedPlants(suggestedPlants){
      dispatch(setSuggestedPlants(suggestedPlants))
    },
    dispatchSetDropdownStatus(dropdownStatus){
      dispatch(setDropdownStatus(dropdownStatus))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentGardens);
*/
