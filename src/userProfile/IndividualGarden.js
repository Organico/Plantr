import React, { Component } from 'react';
import { setDropdownStatus } from '../Actions/GardenActions.js';
import { connect } from 'react-redux';
import PlantGrid from '../GardenSquareGrid/PlantGrid';
import GardenGrid from '../GardenSquareGrid/GardenGrid';
import { Stage } from 'react-konva';

class IndividualGarden extends Component {

  handleClick(str){
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
      borderRadius: '50%'
    }
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
    dispatchSetDropdownStatus(dropdownStatus){
      dispatch(setDropdownStatus(dropdownStatus))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualGarden);
