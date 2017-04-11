import React from 'react';
import { connect } from 'react-redux';
import { setWidth, setHeight, setGardenParameters, setGarden, getAllGardens, getAllPlants, setDropdown, getGardenFromDropdown} from '../action';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import MySquare from './MySquare.js';
import Plant from './Plant.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import Dropdown from "react-bootstrap-dropdown";


const GardenSquareGridView = React.createClass({

  componentDidMount () {
    // this.props.dispatchGetAllGardens()
  },

  select(item){
    var gardenIndex = item.value
    console.log("About to go to the action. Garden index is: ", gardenIndex);
    this.props.dispatchGetGardenFromDropdown(gardenIndex);
  },

  getAllGardens() {
   axios.get('/api/gardens').then((res) => {

            var dbGardenGridData = res.data;
            console.log("DB gargen Grid data: ", dbGardenGridData);
            var dbGardenGrids = [];
            var dbPlantGrids = [];
            var dbDropdownOptions = [];

            for (var i = 0; i<dbGardenGridData.length; i++) {
              var individualGarden = dbGardenGridData[i].gardenGrid;
              var individualPlant = dbGardenGridData[i].plantGrid;
              dbGardenGrids.push(individualGarden);
              dbPlantGrids.push(individualPlant);

              var dropDownObject = {
                text: "Garden :" + i,
                value: i.toString()
              }
              dbDropdownOptions.push(dropDownObject);
            }

            // console.log("Res ", res);
            // console.log("Res.data ", dbGardenGrids);

            // console.log("Db garden grids in getAllGardens: ", dbGardenGrids)
            // console.log("Db garden grids in getAllPlants: ", dbPlantGrids)

            this.props.dispatchGetAllGardens(dbGardenGrids);
            this.props.dispatchGetAllPlants(dbPlantGrids);
            this.props.dispatchSetDropdown(dbDropdownOptions);

          }).catch((err) => {
            console.error(err);
            console.log("Error in getGardenSquareGrid getAllGardens()")
          });
  },



  getSingleGarden(allGardens){


    this.props.dispatchSetGarden(dbGardenGrid);

    return //array of {}
  },

  render () {

    let input;
    let width;
    let height;
    let color;
    let demo1 = [
  {
    text: "Action",
    value: "0"
  },
  {
    text: "Another action",
    value: "1"
  },
  {
    text: "Something else here",
    value: "2"
  },
  {
    text: "Separated link",
    value: "3"
  },
];

    return (
        <div className="text-center">
           <Dropdown
            title="MyDropdown"
            items={this.props.gardenDropdown}
            onSelect={this.select} />
          <h1> Garden Square Grid </h1>
            <input ref={(node) => width = node } type="number" name="width" placeholder='Feet [width] is your garden?'/>
            <input ref={(node) => height = node } type="number" name="height" placeholder='Feet [height] is your garden?'/>
            <button className="btn btn-primary btn-sm" onClick={() => {
              console.log("Button clicked");
              this.getAllGardens();
            }} type="submit">Get All Gardens
            </button>

          <div >
          <br></br>
          <br></br>

            <Stage id="cat" width={500} height={500} fill="white" stroke="black" className = "text-center">
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
    searchTerm: state.searchTerm,
    gardenDropdown: state.gardenDropdown
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchSetGardenParameters(width, height, color) {
      dispatch(setGardenParameters(width, height, color));
    },
    dispatchSetDropdown(dbDropdownOptions) {
      dispatch(setDropdown(dbDropdownOptions));
    },
    dispatchSetGarden(dbGardenGrid) {
      dispatch(setGarden(dbGardenGrid));
    },
    dispatchGetAllGardens(dbGardenGrids) {
      dispatch(getAllGardens(dbGardenGrids));
    },
    dispatchGetAllPlants(dbPlantGrids) {
      dispatch(getAllPlants(dbPlantGrids));
    },
    dispatchGetGardenFromDropdown(gardenIndex) {
      dispatch(getGardenFromDropdown(gardenIndex));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GardenSquareGridView);