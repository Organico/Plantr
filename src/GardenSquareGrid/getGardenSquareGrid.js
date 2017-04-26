import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setWidth, setHeight, setGardenParameters, setGarden, getAllGardens, getAllPlants, setDropdown, getGardenFromDropdown, getPlantsFromDropdown} from '../Actions/GardenActions.js';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import MySquare from './MySquare.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PlantGrid from './PlantGrid.js';
import Plant from './Plant.js';
import Modal from  'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class GardenSquareGridView extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      modalIsOpen: false
    }
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
    this.props.dispatchGetGardenFromDropdown(gardenIndex);
    this.props.dispatchGetPlantsFromDropdown(gardenIndex);
  }

  getAllGardens() {
   axios.get('/api/gardens').then((res) => {
      var dbGardenGridData = res.data;
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
      console.error("Error in getGardenSquareGrid getAllGardens()", err);
    });
  }

  getSingleGarden(allGardens){
    this.props.dispatchSetGarden(dbGardenGrid);
    return//array of {}
  }
  componentDidMount () {
     this.getAllGardens()
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
      <br />
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
          {this.props.gardenDropdown.map((dropdownOption, i) =>
            <option onClick={this.openModal} key={i} value={dropdownOption.value}>{dropdownOption.text}</option>)
          }
        </select>
      </form>
          <div>
          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <Stage id="cat" width={500} height={500} fill="white" stroke="black" className = "text-center">
                <GardenGrid />
                <PlantGrid />
              </Stage>
              <button onClick={this.closeModal}>close</button>
            </Modal>
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
