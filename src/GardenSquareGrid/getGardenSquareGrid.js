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
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

var gardens = [
];


class GardenSquareGridView extends React.Component{
 constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      propsdo: this.props
    };

    this.getGardens = this.getGardens.bind(this);
  }

  componentDidMount(){
    this.getAllGardens()
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  getSuggestions(value) {

      const escapedValue = this.escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }

      const regex = new RegExp('\\b' + escapedValue, 'i');

      return gardens.filter(person => regex.test(this.getSuggestionValue(person)));
    }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }


  getGardens(suggestion) {
    console.log("HERE ARE THE PROPS", this.props)
    this.props.dispatchGetAllGardens(suggestion.gardenGrid)
    this.props.dispatchGetAllPlants(suggestion.plantGrid)
    this.props.dispatchSetGarden(dbGardenGrid);

  }




  getSuggestionValue(suggestion) {
    this.getGardens(suggestion);
    return `${suggestion.gardenName} ${suggestion.userEmail}`;
  }

  renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.gardenName} ${suggestion.userEmail}`;
    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);


    return (
      <span className={'suggestion-content ' + suggestion.twitter}>
        <span className="name">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;

              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
        </span>
      </span>
    );
  }

  getAllGardens() {
   axios.get('/api/gardens').then((res) => {

            var dbGardenGridData = res.data;
            console.log("DB gargen Grid data: ", dbGardenGridData);
            var allGardens = [];
            var userGardens = [];

            for (var i = 0; i<dbGardenGridData.length; i++) {

              var gardenObj = {}

              var dbGardenGrid = dbGardenGridData[i].gardenGrid;
              var dbPlantGrid = dbGardenGridData[i].plantGrid;
              var dbUserEmail = dbGardenGridData[i].profileEmail;
              var dbGardenName = dbGardenGridData[i].gardenName;
              var dbProfilePicture = dbGardenGridData[i].profilePicture
              var dbProfileNickname = dbGardenGridData[i].dbProfileNickname;

              gardenObj["gardenGrid"]=  dbGardenGrid;
              gardenObj["plantGrid"]= dbPlantGrid;
              gardenObj["userEmail"] = dbUserEmail;
              gardenObj["gardenName"] = dbGardenName;
              gardenObj["profilePicture"] = dbProfilePicture;
              gardenObj["profileNickname"] = dbProfileNickname;

              console.log("Here is the garden Obj! ", gardenObj);


              allGardens.push(gardenObj);

            }

        gardens = allGardens;

          }).catch((err) => {
            console.error(err);
            console.log("Error in getGardenSquareGrid getAllGardens()")
          });
  }


  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <div>
          <h1>My Gardens</h1>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getGardens={this.getGardens}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps} />
          </div>
        <div>
        <h1>All Gardens</h1>

      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />

        </div>

        <div>
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
