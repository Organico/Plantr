import React from 'react';
import { connect } from 'react-redux';
import { setWidth, setHeight, setGardenParameters, setGarden, getAllGardens, getAllPlants, setDropdown, getGardenFromDropdown, getPlantsFromDropdown} from '../Actions/GardenActions.js';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import MySquare from './MySquare.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PlantGrid from './PlantGrid.js';
import Plant from './Plant.js';


class GardenSquareGridView extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }




  onChange(e) {
    this.setState({
      value: e.target.value
    });

    var gardenIndex = e.target.value;
    console.log("About to go to the action. Garden index is: ", gardenIndex);
    this.props.dispatchGetGardenFromDropdown(gardenIndex);
    this.props.dispatchGetPlantsFromDropdown(gardenIndex);
  }


  componentDidMount () {
    // this.props.dispatchGetAllGardens()
  }

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

            this.props.dispatchGetAllGardens(dbGardenGrids);
            this.props.dispatchGetAllPlants(dbPlantGrids);
            this.props.dispatchSetDropdown(dbDropdownOptions);

          }).catch((err) => {
            console.error(err);
            console.log("Error in getGardenSquareGrid getAllGardens()")
          });
  }



  getSingleGarden(allGardens){


    this.props.dispatchSetGarden(dbGardenGrid);

    return//array of {}
  }

  render () {

    let input;
    let width;
    let height;
    let color;
    let options = [];

    return (
    <div className="text-center">
      <form>
        <label htmlFor="select1" >Select From Your Gardens</label>
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
          {this.props.gardenDropdown.map((dropdownOption, i) =>
            <option key={i} value={dropdownOption.value}>{dropdownOption.text}</option>)
          }
        </select>
      </form>


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
              <PlantGrid />


            </Stage>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gardenDropdown: state.gardenReducer.gardenDropdown
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
    },
    dispatchGetPlantsFromDropdown(gardenIndex) {
      dispatch(getPlantsFromDropdown(gardenIndex));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GardenSquareGridView);
