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
        'x':20,
        'y':20,
        'color': 'blue'
      }
  ],

  plantShelf: [
    {
      'x':230,
      'y':300,
      'color': 'yellow'
    },
    {
      'x':230,
      'y':360,
      'color': 'black'
    },
    {
      'x':230,
      'y':420,
      'color': 'green'
    },
    {
      'x':230,
      'y':480,
      'color': 'green'
    }
  ],

  //user profile state
  username: '',
  gardens: [],
  plants: [],

  gardenDropdown: [],
  gardenIndex: 0
};


// const movePiece = (state, action) => {
//   const {location} = state;
//   const newState = {};
//   Object.assign(newState, state, {location: action.location});

//   console.log('(before) state: ', state);
//   console.log('(after) state: ', newState);
//   return newState
// }

// const setWidth = (state, action) => {
//   // console.log(state);
//   // console.log(action.width);
//   // console.log("action", action);

//   const {width} = state;
//   const newState = {};
//   Object.assign(newState, state, {width: action.width})

//   console.log('(before) state: ', state)
//   console.log('(after) state: ', newState)
//   return newState
// }

// const setHeight = (state, action) => {
//   // console.log(state);
//   // console.log(action.height);
//   // console.log("action", action);
//   const {height} = state;
//   const newState = {};
//   Object.assign(newState, state, {width: action.height})

//   console.log('(before) state: ', state)
//   console.log('(after) state: ', newState)
//   return newState
// }

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

  var gardenGridArray = [];
  for (var i = 1; i < action.height + 1; i++ ) {
    for (var j =1; j < action.width + 1; j++) {
      var squareCounter = "square" + idCounter;
      // console.log("The square counter is: ", squareCounter);
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

const getGardenFromDropdown = (state, action) => {
  console.log('(before) state: ', state);
  const newState = {};
  const { gardens } = state

  var newGardenGrid = gardens[action.gardenIndex];
  // var newGardenGrid = state.gardens[action.gardenIndex];

  console.log("Garden at gardens action.gardenIndex", newGardenGrid)
  const {gardenGrid} = state;

  // console.log("The gardens for this user are ", action.dbGardenGrids);

  Object.assign(newState, state, {gardenGrid: newGardenGrid});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};

const getAllPlants = (state, action) => {
  console.log('(before) state: ', state);

  const newState = {};
  const {plants} = state;

  console.log("This is db plant grids at 0: ", action.dbPlantGrids[0]);
  console.log("This is db plant grids at 0: ", action.dbPlantGrids[0][0]);
  console.log("DB plant grid x at 0 is ", action.dbPlantGrids[0][0].x);

  var newPlantGrid = [
      {
        'x': action.dbPlantGrids[0][0].x,
        'y': action.dbPlantGrids[0][0].y,
        'color': 'brown'
      }
  ]

  console.log("The new plant grid is: ", newPlantGrid);
  console.log("Inside here!");
  console.log("The plants for this user are ", action.dbPlantGrids);

  Object.assign(newState, state, {plantGrid: newPlantGrid});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
}

const setDropdown = (state, action) => {
  console.log("set dropdown function reducer")
  console.log("set dropdown function action: ", action);

  const newState = {};
  const {gardenDropdown} = state;

  var newGardenDropdown = action.dbDropdownOptions
  Object.assign(newState, state, {gardenDropdown: newGardenDropdown});

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

const addPlantToPlantGrid = (state, action) => {
  console.log("addingPlant to plant grid in reducer");
  console.log('(before) state: ', state);
  const newState = {};
  const {plantGrid} = state;

  console.log("action", action);
  console.log("plantGrid before", plantGrid)
  var newPlantGrid = plantGrid.push(action.plant)
  console.log("plantGrid after", newPlantGrid)

  Object.assign(newState, state, {plantGrid: newPlantGrid});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState

}

function reducer(state = initialState, action) {
  console.log('reducer.js - Reducer called');
  console.log('current action: ', action)
  switch (action.type) {
    // case 'SET_WIDTH':
    //   return setWidth(state, action);
    // case 'SET_HEIGHT':
    //   return setHeight(state, action);
    // case 'MOVE_PIECE':
    //   return movePiece(state, action);
    case 'TOGGLE_SQUARE':
      return toggleSquare(state, action);
    case 'SET_GARDEN_PARAMETERS':
      return setGardenParameters(state, action);
    case 'SET_GARDEN':
      return setGarden(state, action);
    case 'SET_DROPDOWN_OPTIONS':
      return setDropdown(state, action);
    case 'GET_ALL_GARDENS':
      return getAllGardens(state, action);
    case 'GET_GARDEN_FROM_DROPDOWN':
      return getGardenFromDropdown(state, action);
    case 'GET_ALL_PLANTS':
      return getAllPlants(state, action);
    case 'ADD_PLANT_TO_PLANT_GRID':
      return addPlantToPlantGrid(state, action);
    //userProfile
    case 'SET_USER_PARAMETERS':
      return userProfile(state, action);
    default:
      return state
  }
}

export default reducer;