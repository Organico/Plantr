import React from 'react';
import { connect } from 'react-redux';
import { setWidth, setHeight, setGardenParameters, setGarden } from '../action';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import MySquare from './MySquare.js';
import Plant from './Plant.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import PlantShelf from './PlantShelf.js'





const MakeGardenSquareGridView = React.createClass({

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

          <div >
            <Stage id="cat" width={500} height={500} fill="white" stroke="black" className="text-center">
              <GardenGrid />
              <Layer >
                <Plant />
              </Layer>
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
    searchTerm: state.searchTerm,

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