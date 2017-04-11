import React from 'react';
import { connect } from 'react-redux';
import { setWidth, setHeight, setGardenParameters, setGarden } from '../action';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import MySquare from './MySquare.js';
import Plant from './Plant.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import PlantShelf from './PlantShelf.js'

import PlantGrid from './PlantGrid.js';
import querystring from 'querystring'


const MakeGardenSquareGridView = React.createClass({

 // querystring.stringify({
 //        gardenId: 10,
 //        userId: 10,
 //        gardenGrid: this.props.gardenGrid,
 //        plantGrid: this.props.plantGrid
 //     })


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

    return (
        <div className="text-center">
          <h1> Garden Square Grid </h1>
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

          <div >
            <Stage id="cat" width={500} height={500} fill="white" stroke="black" className="text-center">
              <GardenGrid />
              <PlantGrid />

              <Layer>
                <PlantShelf />
              </Layer>
            </Stage>
          </div>
        </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    gardenGrid: state.gardenGrid,
    plantGrid: state.plantGrid
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
export default connect(mapStateToProps, mapDispatchToProps)(MakeGardenSquareGridView);