import React from 'react';
import { connect } from 'react-redux';
import {setSuggestedPlants, setSuggestedGarden, toggleVR} from '../Actions/GardenActions.js';
import axios from 'axios';
import GardenGrid from './GardenGrid.js';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PlantGrid from './PlantGrid.js';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import auth from '../client.js'
import VRScene from '../AframeTest/VRScene.js'

// console.log("Here is auth", auth)
// // var profile = auth.getProfile();
// // var email = profile.email

var gardens = [];

var myGardens = [];

// var likeGarden(){
//     axios.post('/api/likes') {
//       likesAndDislikes: this.props.garden:ikesAndDislikes['likes'][]
//     }
//   }


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

var likes = 0;
var dislikes = 0;
var currentUsername = 0;


getAllGardens();

class GardenSquareGridView extends React.Component{
 constructor() {
    super();
    const profile = auth.getProfile();
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


  return2DGrid(){
    return(


        <Stage id="cat" width={800} height={670} fill="white" stroke="black" className="gardenGrid">
          <GardenGrid />
          <PlantGrid />
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

  render() {

    const { value, suggestions, profileName, profileImage } = this.state;
    const inputProps = {
      placeholder: "Search for a garden!",
      value,
      onChange: this.onChange
    };
    const profPic = {
      margin: 'auto',
      marginTop: '10px',
      marginBottom: '5px',
      width: '150px',
      height: '150px',
      backgroundSize: '100%',
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
                <br></br>
                <h4>Likes: {this.props.likes || 0}</h4>
                <h4>Dislikes: {this.props.dislikes || 0}</h4>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Facebook_logo_thumbs_up_like_transparent.png" height="40" onClick={()=> alert("You liked it!")



              }/>
                <img src="https://3.bp.blogspot.com/-qYdpTgtVfxM/VI0U19aUXeI/AAAAAAAACjI/TGhREhcnSes/s1600/2.png" height="40" onClick={()=> alert("You disliked it!")}/>

            </div>
          </div>
        <div className="row">
          <div className="col-md-8">

              <div className="row">
                {this.toggleView(this.props.viewIsTwoD)}
              </div>

            </div>
            <div className="col-md-4">
              <div id="currentPublicGarden">
                <div style={profPic}></div>
                <div className="communityGardenUserName"><h4>{profileName}</h4></div>
                <hr className="hrTwoD" />
                <div><p className="aboutGarden">I'm so excited that I get to work on my garden. From what the create garden app says, it should turn out great!</p></div>
                 <div>
                <button onClick={() => {
                    this.props.dispatchToggleVR(this.props.viewIsTwoD);}}>{this.renderButtonText(this.props.viewIsTwoD)}</button>
              </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    gardenDropdown: state.gardenReducer.gardenDropdown,
    viewIsTwoD: state.gardenReducer.viewIsTwoD

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetSuggestedGarden(suggestedGarden){
      dispatch(setSuggestedGarden(suggestedGarden))
    },
    dispatchSetSuggestedPlants(suggestedPlants){
      dispatch(setSuggestedPlants(suggestedPlants))
    },
    dispatchToggleVR() {
      dispatch(toggleVR());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GardenSquareGridView);