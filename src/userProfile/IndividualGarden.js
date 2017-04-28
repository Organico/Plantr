import React, { Component } from 'react';
import GardenSquareGridView from '../GardenSquareGrid/getGardenSquareGrid';
import {setDropdownStatus} from '../Actions/GardenActions.js';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import auth from '../client.js';
import { setPosts } from '../Actions/ForumActions';
import PlantGrid from '../GardenSquareGrid/PlantGrid';
import GardenGrid from '../GardenSquareGrid/GardenGrid';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';

class IndividualGarden extends Component {



  handleClick(str){
      console.log(this.props);
      console.log("Here is this inside of the individual garden")
      this.props.dispatchSetDropdownStatus(this.context.props.dropdownStatus);
  }

  render() {
    let profilePic = {
      height: '50px',
      width: '50px',
      backgroundImage: 'url(' + this.props.profilePicture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: '900',
      borderRadius: '50%'
    }
    console.log('THIS PROPS IN INDIVIDUAL: ', this);
    return (
      <div className="container-fluid">
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
            <button onClick={() => {
                    this.props.dispatchSetDropdownStatus(this.props.dropdownStatus);}}>Go Back to your Garden</button>
            <div className="row" onClick={ () => {this.handleClick}}>
              <div className="col-mid-10 gardenName">
                { this.props.gardenName }
                <div className="row">
                <Stage width={500} height={500} fill="white" stroke="black" className="text-center">
                  <GardenGrid />
                  <PlantGrid />
                </Stage>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
    dropdownStatus: state.gardenReducer.dropdownStatus

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    },
    dispatchSetDropdownStatus(dropdownStatus){
      dispatch(setDropdownStatus(dropdownStatus))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualGarden);
