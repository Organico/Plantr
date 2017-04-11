const initialState = {
  //garden state
  searchTerm: '',
  todos: [],
  location: [0, 2],
  isDragging: false,

  gardenGrid: [
      {
        'x':0,
        'y':0,
        'color': 'brown'
      }
  ],
  plantGrid: [
      {
        'x':0,
        'y':0,
        'color': 'brown'
      }
  ],
  //user profile state
  username: '',
  gardens: []
};


const movePiece = (state, action) => {
  const {location} = state;
  const newState = {};
  Object.assign(newState, state, {location: action.location});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState
}

const setWidth = (state, action) => {

  // console.log(state);
  // console.log(action.width);
  // console.log("action", action);


  const {width} = state;
  const newState = {};
  Object.assign(newState, state, {width: action.width})

  console.log('(before) state: ', state)
  console.log('(after) state: ', newState)
  return newState
}

const setHeight = (state, action) => {
  // console.log(state);
  // console.log(action.height);
  // console.log("action", action);


  const {height} = state;
  const newState = {};
  Object.assign(newState, state, {width: action.height})

  console.log('(before) state: ', state)
  console.log('(after) state: ', newState)
  return newState
}

const toggleSquare = (state, action) => {
  var squareToToggle;
  var squareToToggleIndex;

  for (var i = 0; i<state.gardenGrid.length; i++){
    var individualSquare = state.gardenGrid[i];
    if (individualSquare.x === action.x && individualSquare.y === action.y) {
      squareToToggle = individualSquare;
      squareToToggleIndex = i;
    }
  }

  var squareToToggleColor = squareToToggle.color;
  var colorToToggleTo = "green";
  if (squareToToggleColor === "green") {
    colorToToggleTo = "brown";
  }

  var gardenCopy = state.gardenGrid.slice();
  // console.log("Here is the original gardenCopy: ", gardenCopy);
  gardenCopy[squareToToggleIndex].color = colorToToggleTo;
  console.log("Here is the altered gardenCopy: ", gardenCopy);



  const {gardenGrid} = state;
  const newState = {};


  Object.assign(newState, state, {gardenGrid: gardenCopy})

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
}

const setGardenParameters = (state, action) => {
  console.log('(before) state: ', state);

  const newState = {};

  const {gardenGrid} = state;



  var idCounter = 0;


  // {"square1": {'x': 50, 'y': } }

  // gardenGrid.square1.color = action.color

  var gardenGridArray = [];
  for (var i = 1; i < action.height + 1; i++ ) {
    for (var j =1; j < action.width + 1; j++) {
      var squareCounter = "square" + idCounter;
      console.log("The square counter is: ", squareCounter);
      // gardenGridArray.push({squareCounter: {'x': i * 50, 'y': j * 50, 'color': action.color}});
      gardenGridArray.push({'x': i * 50, 'y': j * 50, 'color': action.color});

      idCounter++;
    }
  }

  Object.assign(newState, state, {gardenGrid: gardenGridArray});

  return newState;
}



const setGarden = (state, action) => {
  console.log('(before) state: ', state);

  const newState = {};

  const {gardenGrid} = state;

  Object.assign(newState, state, {gardenGrid: action.dbGardenGrid});
  return newState;
}


const getAllGardens = (state, action) => {
  console.log('(before) state: ', state);

  const newState = {};

  const {gardens} = state;

  console.log("The gardens for this user are ", action.dbGardenGrids);

  Object.assign(newState, state, {gardens: action.dbGardenGrids});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
}

const userProfile = (state, action) => {
  console.log('(before) state: ', state);

  const newState = {};

  const {username, gardens} = state;

  console.log("The gardens for this user are ", action.username);

  Object.assign(newState, state, {username: action.username, gardens: action.gardens});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState
}

  function reducer(state = initialState, action) {
    console.log('reducer.js - Reducer called');
    console.log('current action: ', action)
    switch (action.type) {
      case 'SET_WIDTH':
        return setWidth(state, action);
      case 'SET_HEIGHT':
        return setHeight(state, action);
      case 'MOVE_PIECE':
        return movePiece(state, action);
      case 'SET_GARDEN_PARAMETERS':
        return setGardenParameters(state, action);
      case 'SET_GARDEN':
        return setGarden(state, action);
      case 'GET_ALL_GARDENS':
        return getAllGardens(state, action);
      case 'TOGGLE_SQUARE':
        return toggleSquare(state, action);
      case 'SET_USER_PARAMETERS':
        return userProfile(state, action);
      default:
        return state
    }
  }

export default reducer;