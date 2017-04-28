import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setGardenParameters, setGarden, undo, redo, clear, setHeight, setWidth, toggleVR} from '../Actions/GardenActions.js';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import MySquare from './MySquare.js';
import Plant from './Plant.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import PlantShelf from './PlantShelf.js'
import CostEstimate from './CostEstimate.js';
import PlantGrid from './PlantGrid.js';
import querystring from 'querystring'
import MyRect from './MyRectangle.js'
import SeedPacket from '../SeedPacket/SeedPacket.js';
import HarvestGraph from '../Analytics/HarvestGraph.js';
import AnalyticsTabs from '../Analytics/AnalyticsTabs.js';
import PlantBreakdown from '../Analytics/PlantBreakdown.js';
import PlantDex from '../PlantDex/PlantDex.js'
import VRScene from '../AframeTest/VRScene.js'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import html2canvas from 'html2canvas';
import auth from '../client.js'
import Modal from  'react-modal';
import CreateNewPost from '../Forum/CreateNewPost';


const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d6eef9',
    borderRadius: '10px'
  }
};


class MakeGardenSquareGridView extends Component{
    constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }






  saveGarden(profilePicture, profileEmail, profileNickname, gardenName, zone) {
    console.log("Saving garden...")
      var myImage;
      html2canvas(document.body, {
      onrendered: function(canvas) {
              myImage = canvas.toDataURL("image/png");
              console.log("Here is your image");
            // window.open(myImage);
      }
    });

    // console.log("myImage is! ", myImage)
    axios.post('/api/gardens',
      {
        gardenId: Math.random()*100,
        userId: Math.random()*100,
        gardenGrid: this.props.gardenGrid,
        plantGrid: this.props.plantGrid,
        profilePicture: profilePicture,
        profileEmail: profileEmail,
        profileNickname: profileNickname,
        gardenImage: myImage,
        gardenName: gardenName,
        hardinessZone: zone
      }
    ).then((res) => {
      console.log("Successful post");
    }).catch((err) => {
      console.error(err);
      console.log("Error in getGardenSquareGrid getAllGardens()")
    });
  }
  setHeight(e){
      let height = parseInt(e.target.value);
      this.props.dispatchSetHeight(height);
      // console.log(this.props)
      this.props.dispatchSetGardenParameters(this.props.width, height);
  }

  setWidth(e){
      let width = parseInt(e.target.value);
      this.props.dispatchSetWidth(width);
      this.props.dispatchSetGardenParameters(width, this.props.height);
  }

  return2DGrid(){
    return(


        <Stage id="cat" width={800} height={670} fill="white" stroke="black" className="gardenGrid">
          <GardenGrid />
          <PlantGrid />
          <Layer className="plantShelf">
            <PlantShelf />
            <MyRect />
          </Layer>
        </Stage>

    )
  }

  return3DGrid(){
    return (<VRScene />)
  }

  toggleView(viewIsTwoD){
    if(viewIsTwoD === true){
      return this.return2DGrid()
    } else {
      return this.return3DGrid()
    }
  }

  renderButtonText(viewIsTwoD){
    if(viewIsTwoD === true){
      return "Switch to 3D"
    } else {
      return "Switch to 2D"
    }
  }


  render () {
    let input;
    let width = 10;
    let height = 10;
    let color;
    let center = {
      textAlign: "center"
    };
    let that = this;
    let gardenName;
    let profile = auth.getProfile();
    let profilePicture = profile.picture
    let profileEmail = profile.email;
    let profileNickname = profile.nickname

  if (false) {
    return <VRScene />
  } else {
   return (

      <div className="container" style={center}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <img id="seed" src="https://s3-us-west-2.amazonaws.com/ryaperry-bucket/banners/Plantr_Build_A_Garden.png" alt="Build a Garden" crossOrigin="anonymous" width="500" height="149"></img>
          </div>
        </div>
      <hr className="hrTwoD"/>
        <div className="row">
          <div className="col-md-3 toolBar">
            Garden Height <br/>
            <span><strong>{this.props.width} ft</strong></span>
              <form action="#">
                <p className="range-field">
                  <input type="range" min="1" max="10" step="1" value={parseInt(this.props.width)} onChange={this.setWidth}/>
                </p>
              </form>
            Garden Width <br/>
            <span><strong>{this.props.height} ft</strong></span>
              <form action="#">
                <p className="range-field">
                  <input type="range"  min="1" max="14" step="1" value={this.props.height} onChange={this.setHeight}/>
                </p>
              </form>
                <button id="postHere" type="submit" onClick={that.openModal}>Post Here!</button>
                 <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >        <h3>Post Your Questions or Successes Onto the Forum</h3>
            <button onClick={this.closeModal}>close</button>
         </Modal>

             <input ref={(node) => gardenName = node } type="text" name="gardenName" placeholder='Name your new garden' required/>
                <button className="btn btn-primary btn-sm" onClick={() => {
                  this.saveGarden(profilePicture, profileEmail, profileNickname, gardenName.value, this.props.zone);
                  }} type="submit">Submit Garden
                </button>

              <div id="seedHolder">
                <SeedPacket />
              </div>
              <div>
                <button onClick={() => {
                    this.props.dispatchUndo();}}>Undo</button>
                <button onClick={() => {
                    this.props.dispatchClear();}}>Clear</button>
                <button onClick={() => {
                    this.props.dispatchUndo();}}>Redo</button>
                <button onClick={() => {
                    this.props.dispatchClear();}}>Delete</button>
                <button onClick={() => {
                    this.props.dispatchToggleVR(this.props.viewIsTwoD);}}>{this.renderButtonText(this.props.viewIsTwoD)}</button>
              </div>
              <div className="col-md-12 offset-md-1">
                <p>Harvest Graph</p>
                <HarvestGraph />
              </div>
          </div>

          <div className="col-md-8">


          {this.toggleView(this.props.viewIsTwoD)}



            <div className="col-md-12">
              <PlantDex />
            </div>
            <br></br>
            <div className="col-md-12 AnalyticsTabs">
              <AnalyticsTabs />
            </div>
          </div>
        </div>

        <div className="row" style={center}>
        </div>
      </div>
    );
  }
}
};

const mapStateToProps = (state) => {
  return {
    gardenGrid: state.gardenReducer.gardenGrid,
    plantGrid: state.gardenReducer.plantGrid,
    width: state.gardenReducer.width,
    height: state.gardenReducer.height,
    tooltipOpen: state.gardenReducer.tooltipOpen,
    viewIsTwoD: state.gardenReducer.viewIsTwoD,
    zone: state.weatherReducer.zone
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchSetGardenParameters(width, height, color) {
      dispatch(setGardenParameters(width, height, color));
    },
    dispatchSetGarden(dbGardenGrid) {
      dispatch(setGarden(dbGardenGrid));
    },
    dispatchSetHeight(height){
      dispatch(setHeight(height));
    },
    dispatchSetWidth(width){
      dispatch(setWidth(width));
    },
    dispatchUndo() {
      dispatch(undo());
    },
    dispatchRedo() {
      dispatch(redo());
    },
    dispatchClear() {
      dispatch(clear());
    },
    dispatchToggleVR() {
      dispatch(toggleVR());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MakeGardenSquareGridView);