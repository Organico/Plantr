import React from 'react';
import { connect } from 'react-redux';
import {setGardenParameters, setGarden, undo, redo, clear} from '../Actions/GardenActions.js';
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
import PlantDex from '../PlantDex/PlantDex.js'




const MakeGardenSquareGridView = React.createClass({

  saveGarden() {
    console.log("Saving garden...")
    axios.post('/api/gardens',
      {
        gardenId: Math.random()*100,
        userId: Math.random()*100,
        gardenGrid: this.props.gardenGrid,
        plantGrid: this.props.plantGrid
      }
    ).then((res) => {
      console.log("Successful post");
    }).catch((err) => {
      console.error(err);
      console.log("Error in getGardenSquareGrid getAllGardens()")
    });
  },


  render () {
    let input;
    let width;
    let height;
    let color;
    let center = {
      textAlign: "center"
    };





    return (
      <div style={center}>
        <h1>Create a Garden</h1>
            <input ref={(node) => width = node } type="number" name="width" placeholder='Feet [width] is your garden?'/>
            <input ref={(node) => height = node } type="number" name="height" placeholder='Feet [height] is your garden?'/>
            <button className="btn btn-primary btn-sm" onClick={() => {
                this.props.dispatchSetGardenParameters(+width.value, +height.value, "green");
                }} type="submit">Set Garden Parameters
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => {
              this.saveGarden();
              }} type="submit">Submit Garden
            </button>
            <br></br><br></br>
        <div className="row" style={center}>
          <div className="col-md-6">
            <button onClick={() => {
                this.props.dispatchUndo();}}>Undo</button>
            <button onClick={() => {
                this.props.dispatchClear();}}>Clear</button>
            <div className="row">
              <Stage id="cat" width={800} height={670} fill="white" stroke="black" className="text-center">

                <GardenGrid />
                <PlantGrid />
                <Layer className="plantShelf">
                  <PlantShelf />
                  <MyRect />
                </Layer>
              </Stage>
            </div>
            <div className="row">
              <PlantDex />
            </div>
          </div>

            <div className="col-md-5 offset-md-1">
              <div className="row" id="costEstimate">
              <div className="col-md-6 offset-md-3 userRecentSpan" id="seedHolder">
                  <SeedPacket />
                </div>
                <div className="col-md-10">
                  <HarvestGraph />
                </div>


              </div>
        </div>


        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    gardenGrid: state.gardenReducer.gardenGrid,
    plantGrid: state.gardenReducer.plantGrid,
    tooltipOpen: state.gardenReducer.tooltipOpen
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
    dispatchUndo() {
      dispatch(undo());
    },
    dispatchRedo() {
      dispatch(redo());
    },
    dispatchClear() {
      dispatch(clear());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MakeGardenSquareGridView);