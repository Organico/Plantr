import React from 'react';
import { connect } from 'react-redux';
import { setWidth, setHeight, setGardenParameters, setGarden } from '../action';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import MySquare from './MySquare.js';
import Plant from './Plant.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';

const GardenSquareGridView = React.createClass({

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
              axios.get('/api/gardens').then((res) => {
                var dbGardenGrid = res.data[0].gardenGrid;
                this.props.dispatchSetGarden(dbGardenGrid);
              }).catch((err) => {
                console.error(err);
              });
            }} type="submit">makeGrid
            </button>
          <div >
            <Stage id="cat" width={500} height={500} fill="white" stroke="black">
              <GardenGrid />
              <Layer >
                <Plant/>
              </Layer>
            </Stage>
          </div>
        </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
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
export default connect(mapStateToProps, mapDispatchToProps)(GardenSquareGridView);