import React from 'react';
import { connect } from 'react-redux';
import {setSuggestedPlants, setSuggestedGarden} from '../Actions/GardenActions.js';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PlantGrid from './PlantGrid.js';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import auth from '../client.js'
// console.log("Here is auth", auth)
// // var profile = auth.getProfile();
// // var email = profile.email

const profile = auth.getProfile();
var gardens = [];

var myGardens = [];

var getAllGardens = function() {
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

              // console.log("Here is the garden Obj! ", gardenObj);


              allGardens.push(gardenObj);

              if ("skebaish1992@gmail.com" === dbUserEmail){
                myGardens.push(gardenObj)
              }

            }

        gardens = allGardens;

          }).catch((err) => {
            console.error(err);
            console.log("Error in getGardenSquareGrid getAllGardens()")
          });
  }

getAllGardens();

class GardenSquareGridView extends React.Component{
 constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      propsdo: this.props,
      profileName: profile.nickname,
      profileImage: profile.picture
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
  onUserSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getUserSpecificSuggestions(value)
    });
  };

  setGardenToSuggestion = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    var newGarden = suggestion.gardenGrid;
    var newPlantGrid = suggestion.plantGrid;
    this.props.dispatchSetSuggestedGarden(newGarden)
    this.props.dispatchSetSuggestedPlants(newPlantGrid)
    this.setState({
      profileName: suggestion.userEmail,
      profileImage: suggestion.profilePicture
    })
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

    getUserSpecificSuggestions(value) {

      const escapedValue = this.escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }

      const regex = new RegExp('\\b' + escapedValue, 'i');

      return myGardens.filter(person => regex.test(this.getSuggestionValue(person)));
    }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }


  getGardens(suggestion) {
    console.log("Suggestion plant grid is ", suggestion)
  }




  getSuggestionValue(suggestion) {
    console.log("CALLED GET SUGGESTION VALUE")
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




  render() {

    const { value, suggestions, profileName, profileImage } = this.state;
    const inputProps = {
      placeholder: "Search for a garden!",
      value,
      onChange: this.onChange
    };
    const profPic = {
      magin: 'auto',
      width: '100px',
      height: '250px',
      backgroundSize: '150px 150px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: 'url(' + profileImage + ')'
    }
    console.log('profileImage', profileImage);
    return (
      <div className="container">
          <div className="row">
            <div className="searchGardenBar col-md-4 offset-md-4">
              <h2>Community Gardens</h2>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.setGardenToSuggestion}
                getGardens={this.getGardens}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />
            </div>
          </div>
        <div className="row">
          <div className="col-md-8">

              <div className="row">
                  <Stage width={700} height={700} fill="white" stroke="black" className = "text-center">
                    <GardenGrid />
                    <PlantGrid />
                  </Stage>
              </div>
            </div>
            <div className="col-md-4">
              <div id="currentPublicGarden">
                <div style={profPic}></div>
                <div><h3>{profileName}</h3></div>
                <div><p>user about goes here. this is a little something sweet about me. and maybe even something about the current garden. who knows what is possible!</p></div>
              </div>
            </div>
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
    dispatchSetSuggestedGarden(suggestedGarden){
      dispatch(setSuggestedGarden(suggestedGarden))
    },
    dispatchSetSuggestedPlants(suggestedPlants){
      dispatch(setSuggestedPlants(suggestedPlants))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GardenSquareGridView);