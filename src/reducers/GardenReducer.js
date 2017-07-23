const makeImage = function(urlsrc) {
  let newImage = new Image();
  newImage.src = urlsrc;
  return newImage;
};

const initialGardenState = {
  viewIsTwoD: true,
  location: [0, 2],
  isDragging: false,
  tooltipOpen: false,
  colladaCache: {},
  dropdownStatus: false,
  squareFootage: 25,
  gardenXYCoordinates:[{'x': 75,'y': 75, 'viability': true},{'x': 75,'y': 125, 'viability': true},{'x': 75,'y': 175, 'viability': true},{'x': 75,'y': 225, 'viability': true},{'x': 75,'y': 275, 'viability': true},{'x': 125,'y': 75, 'viability': true},{'x': 125,'y': 125, 'viability': true},{'x': 125,'y': 175, 'viability': true},{'x': 125,'y': 225, 'viability': true},{'x': 125,'y': 275, 'viability': true},{'x': 175,'y': 75, 'viability': true},{'x': 175,'y': 125, 'viability': true},{'x': 175,'y': 175, 'viability': true},{'x': 175,'y': 225, 'viability': true},{'x': 175,'y': 275, 'viability': true},{'x': 225,'y': 75, 'viability': true},{'x': 225,'y': 125, 'viability': true},{'x': 225,'y': 175, 'viability': true},{'x': 225,'y': 225, 'viability': true},{'x': 225,'y': 275, 'viability': true},{'x': 275,'y': 75, 'viability': true},{'x': 275,'y': 125, 'viability': true},{'x': 275,'y': 175, 'viability': true},{'x': 275,'y': 225, 'viability': true},{'x': 275,'y': 275, 'viability': true}],
  selectedTitle: 'https://c1.staticflickr.com/3/2923/33742489190_3e30fca5f7_o.jpg',
  harvestTable:[],
  pastPlantGridStates: [],
  futurePlantGrideStates: [],
  analytics: {
    'numberPlants': 0,
    'squareFootage':0,
    'soilSquareFootage': 0,
    'seedPacketCosts': 0,
    'numSeedPackets': 0,
    'totalCost': 0,
    'totalNumberOfSeedPackets': 0,
    'plantLibrary': {},
    'numFruits': 0,
    'numVeggies': 0,
    'numFlowers': 0
  },
  seedPacket:{
    'name': 'tomato',
    'price': 1.25,
    'quantity': 10,
    'season': 'Spring',
    'description': 'Initial State',
    'instructions': 'Take good care of me',
    'sunlight': 'Full-sun',
    'harvest': 50,
    'extremeWarning': [10,37],
    'packetImg': '/seedPacketIMGs/tomatoResized.png'
  },
  plantGrowthGraph: [
    {name: 'Start Seeds', uv: 0},
    {name: 'Sow', uv: 20},
    {name: 'Harvest', uv: 45},
    {name: 'End', uv: 60}
  ],
  gardenGrid: [{'x': 75,'y': 75, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 75,'y': 125, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 75,'y': 175, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 75,'y': 225, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 75,'y': 275, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 125,'y': 75, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 125,'y': 125, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 125,'y': 175, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 125,'y': 225, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 125,'y': 275, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 175,'y': 75, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 175,'y': 125, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 175,'y': 175, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 175,'y': 225, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 175,'y': 275, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 225,'y': 75, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 225,'y': 125, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 225,'y': 175, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 225,'y': 225, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 225,'y': 275, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 275,'y': 75, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 275,'y': 125, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 275,'y': 175, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 275,'y': 225, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true},{'x': 275,'y': 275, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true}],
  plantGrid: [],
  height: 5,
  width: 5,
  plantShelf: [
    {
      'name': 'sunflower',
      'type': 'flower',
      'x': 50,
      'y': 600,
      'img': 'https://c1.staticflickr.com/3/2909/33168957064_a7ef238410_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 20,
      'quantity': 5,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 51,
      'extremeWarning': [10,40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom Start', uv: 38},
        {name: 'Harvest', uv: 51},
        {name: 'End', uv: 65}
      ],
      'zone': 6
    },
    {
      'name': 'corn',
      'type': 'vegetable',
      'x': 100,
      'y': 600,
      'img': 'https://c2.staticflickr.com/4/3937/33984681002_35a872f2f2_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/cornModel3.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/cornResized.png',
      'price': 2.60,
      'quantity': 16,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 45,
      'extremeWarning': [7, 35],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 27},
        {name: 'Harvest', uv: 45},
        {name: 'Harvest \r End', uv: 65}
      ],
      'zone': 6
    },
    { 'name': 'tomato',
      'type': 'fruit',
      'x': 150,
      'y': 600,
      'img': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantImages/tomatoePlant.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/tomatoeModel.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/tomatoResized.png',
      'price': 3.25,
      'quantity': 20,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 40,
      'extremeWarning': [10,35],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 5},
        {name: 'Bloom \r Start', uv: 22},
        {name: 'Harvest', uv: 40},
        {name: 'Harvest \r End', uv: 72}
      ],
      'zone': 6
    },
    {
      'name': 'green bean',
      'type': 'vegetable',
      'x': 200,
      'y': 600,
      'img': 'https://c1.staticflickr.com/3/2939/33200675713_ea06c54442_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/peppersModel3.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/beansResized.png',
      'price': 3,
      'quantity': 32,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 53,
      'extremeWarning': [12,35],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 8},
        {name: 'Bloom \r Start', uv: 23},
        {name: 'Harvest', uv: 53},
        {name: 'Harvest \r End', uv: 68}
      ],
      'zone': 6
    },
    {
      'name': 'carrots',
      'type': 'vegetable',
      'x': 250,
      'y': 600,
      'img': 'https://c1.staticflickr.com/3/2869/33327563643_a7ffb81e43_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/carrotModel.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/carrotResized.png',
      'price': 4,
      'quantity': 12,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 42,
      'extremeWarning': [5, 27],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 5},
        {name: 'Bloom \r Start', uv: 25},
        {name: 'Harvest', uv: 42},
        {name: 'Harvest \r End', uv: 52}
      ],
      'zone': 6
    },
    {
      'name': 'okra',
      'type': 'vegetable',
      'x': 300,
      'y': 600,
      'img': 'https://c1.staticflickr.com/3/2810/33856016232_8ed446a91d_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 10,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 47,
      'extremeWarning': [12, 30],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 10},
        {name: 'Bloom \r Start', uv: 32},
        {name: 'Harvest', uv: 47},
        {name: 'Harvest \r End', uv: 60}
      ],
      'zone': 6
    },
    { 'name': 'strawberry',
      'type': 'fruit',
      'x': 350,
      'y': 600,
      'img': 'https://c2.staticflickr.com/4/3954/33856016382_0778302b97_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 3,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 37,
      'extremeWarning': [5, 25],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 28},
        {name: 'Harvest', uv: 37},
        {name: 'Harvest \r End', uv: 55}
      ],
      'zone': 6
    },
    {
      'name': 'chili pepper',
      'type': 'vegetable',
      'x': 400,
      'y': 600,
      'img': 'https://c1.staticflickr.com/3/2847/33984618022_9fb8c0250c_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/peppersModel3.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/hotPeppersResized.png',
      'price': 1.20,
      'quantity': 15,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 50,
      'extremeWarning':[7, 40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 4},
        {name: 'Bloom \r Start', uv: 32},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 72}
      ],
      'zone': 6
    }
  ],


  vegiDex: [
    {
      'name': 'okra',
      'type': 'vegetable',
      'x': 50,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2810/33856016232_8ed446a91d_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/OkraResized.png',
      'price': 10,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 40,
      'extremeWarning': [12, 30],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 10},
        {name: 'Bloom \r Start', uv: 32},
        {name: 'Harvest', uv: 47},
        {name: 'Harvest \r End', uv: 60}
      ],
      'zone': 6
    },
    {
      'name': 'onion',
      'type': 'vegetable',
      'x': 100,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2884/33883916601_9c04b38e73_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/OnionResized.png',
      'price': 1.50,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest':45,
      'extremeWarning': [5,40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 10},
        {name: 'Bloom \r Start', uv: 25},
        {name: 'Harvest', uv: 45},
        {name: 'Harvest \r End', uv: 60}
      ],
      'zone': 6
    },
    {
      'name': 'green bean',
      'type': 'vegetable',
      'x': 150,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2939/33200675713_ea06c54442_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': 50,
      'packetImg': '/seedPacketIMGs/beansResized.png',
      'price': 3,
      'quantity': 32,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 53,
      'extremeWarning': [12,35],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 8},
        {name: 'Bloom \r Start', uv: 23},
        {name: 'Harvest', uv: 53},
        {name: 'Harvest \r End', uv: 68}
      ],
      'zone': 6
    },
    {
      'name': 'onion',
      'type': 'vegetable',
      'x': 200,
      'y': 50,
      'img':'https://c1.staticflickr.com/3/2884/33883916601_9c04b38e73_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/OnionResized.png',
      'price': 1.50,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest':45,
      'extremeWarning':[5,40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 10},
        {name: 'Bloom \r Start', uv: 25},
        {name: 'Harvest', uv: 45},
        {name: 'Harvest \r End', uv: 60}
      ],
      'zone': 6
    },
    {
      'name': 'kale',
      'type': 'vegetable',
      'x': 250,
      'y': 50,
      'img': 'https://c2.staticflickr.com/4/3937/33296262464_4c75638658_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/KaleResized.png',
      'price': 1.20,
      'quantity': 15,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 28,
      'extremeWarning': [2, 40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 20},
        {name: 'Harvest', uv: 28},
        {name: 'Harvest \r End', uv: 85}
      ]
    },
    {
      'name': 'snappeas',
      'type': 'vegetable',
      'x': 300,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2919/34013204631_519165ee45_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 1.75,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 34,
      'extremeWarning': [10, 32],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 4},
        {name: 'Bloom \r Start', uv: 22},
        {name: 'Harvest', uv: 34},
        {name: 'Harvest \r End', uv: 65}
      ],
      'zone': 6
    },
    {
      'name': 'potato',
      'type': 'vegetable',
      'x': 350,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2844/33627640530_f866a32b60_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 0.75,
      'quantity': 20,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest':50,
      'extremeWarning': [5,25],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings Emerge', uv: 7},
        {name: 'Bloom Start', uv: 37},
        {name: 'Harvest', uv: 50},
        {name: 'End', uv: 65}
      ],
      'zone': 6
    },
    {
      'name': 'corn',
      'type': 'vegetable',
      'x': 400,
      'y': 50,
      'img': 'https://c2.staticflickr.com/4/3937/33984681002_35a872f2f2_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/cornResized.png',
      'price': 2.60,
      'quantity': 16,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 45,
      'extremeWarning': [7, 35],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 27},
        {name: 'Harvest', uv: 45},
        {name: 'Harvest \r End', uv: 65}
      ],
      'zone': 6
    },
    {
      'name': 'potato',
      'type': 'vegetable',
      'x': 100,
      'y': 600,
      'img': 'https://c1.staticflickr.com/3/2844/33627640530_f866a32b60_o.png',
      'model':'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/cornModel3.dae',
      'isDraggable': true,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 0.75,
      'quantity': 20,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 50,
      'extremeWarning': [5,25],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings Emerge', uv: 7},
        {name: 'Bloom Start', uv: 37},
        {name: 'Harvest', uv: 50},
        {name: 'End', uv: 65}
      ],
      'zone': 6
    },
    {
      'name': 'Pumpkin',
      'type': 'vegetable',
      'x': 450,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2946/34142450326_098f303eca_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/PumpkinResized.png',
      'price': 1.60,
      'quantity': 20,
      'season': 'Summer',
      'description': 'David Pumpkins',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 100,
      'extremeWarning':[5, 27],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 12},
        {name: 'Harvest', uv: 100},
        {name: 'Harvest \r End', uv: 120}
      ],
      'zone': 6
    },
    {
      'name': 'chili pepper',
      'type': 'vegetable',
      'x': 50,
      'y': 100,
      'img': 'https://c1.staticflickr.com/3/2847/33984618022_9fb8c0250c_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/peppersModel3.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/hotPeppersResized.png',
      'price': 1.20,
      'quantity': 15,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 50,
      'extremeWarning':[7, 40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 4},
        {name: 'Bloom \r Start', uv: 32},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 72}
      ],
      'zone': 6
    },
    {
      'name': 'cucumber',
      'type': 'vegetable',
      'x': 100,
      'y': 100,
      'img': 'https://c1.staticflickr.com/3/2830/33757226270_b439776485_o.jpg',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 2,
      'quantity': 20,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 46,
      'extremeWarning': [7, 38],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 5},
        {name: 'Bloom \r Start', uv: 30},
        {name: 'Harvest', uv: 46},
        {name: 'Harvest \r End', uv: 75}
      ],
      'zone': 6
    },
    {
      'name': 'cucumber',
      'type': 'vegetable',
      'x': 150,
      'y': 100,
      'img': 'https://c1.staticflickr.com/3/2820/33984617052_066c5379e9_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 10,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 50,
      'extremeWarning': [0, 40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
      'zone': 6
    }
  ],

  fruitDex: [
    {
      'name': 'strawberry',
      'type': 'fruit',
      'x': 50,
      'y': 50,
      'img': 'https://c2.staticflickr.com/4/3954/33856016382_0778302b97_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 3,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 28,
      'extremeWarning': [5, 25],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 28},
        {name: 'Harvest', uv: 37},
        {name: 'Harvest \r End', uv: 55}
      ],
      'zone': 6
    },
    {
      'name': 'tomato',
      'type': 'fruit',
      'x': 100,
      'y': 50,
      'img': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantImages/tomatoePlant.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/carrotModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/tomatoResized.png',
      'price': 3.25,
      'quantity': 20,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 40,
      'extremeWarning': [10,35],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 5},
        {name: 'Bloom \r Start', uv: 22},
        {name: 'Harvest', uv: 40},
        {name: 'Harvest \r End', uv: 72}
      ],
     'zone': 6
   },
   { //Samy, is this a duplicate?
     'name': 'strawberry',
     'type': 'fruit',
     'x': 50,
     'y': 50,
     'img': 'https://c2.staticflickr.com/4/3954/33856016382_0778302b97_o.png',
     'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
     'isDraggable': false,
     'packetImg': '/seedPacketIMGs/genericResized.png',
     'price': 2,
     'quantity': 15,
     'season': 'Spring',
     'description': 'After Start State',
     'instructions': 'Take great care of me',
     'sunlight': 'Full-sun',
     'harvest': 50,
     'extremeWarning': [5, 35],
     'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
      'zone': 6
    },
    { //Samy, is this a duplicate?
      'name': 'tomato',
      'type': 'fruit',
      'x':100,
      'y':50,
      'img':'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantImages/tomatoePlant.png',
      'model':'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/tomatoeModel.dae',
      'isDraggable': true,
      'packetImg' : '/seedPacketIMGs/tomatoResized.png',
       'price': 10,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest':50,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
      'zone': 6
    },
    {
      'name': 'pineapple',
      'type': 'fruit',
      'x': 150,
      'y': 50,
      'img':'https://c1.staticflickr.com/3/2850/33754040130_3aef5cfda7_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 4,
      'quantity': 12,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 50,
      'extremeWarning': [0, 45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
      'zone': 7
    },
    {
      'name': 'orange',
      'type': 'fruit',
      'x': 200,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2813/33754040170_f89bbcf2d6_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg': '/seedPacketIMGs/genericResized.png',
      'price': 10,
      'quantity': 1,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest':50,
      'extremeWarning': [5, 40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 60},
        {name: 'Harvest \r End', uv: 120}
      ],
      'zone': 7
    },
    {
      'name': 'apple',
      'type': 'fruit',
      'x': 250,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2839/33296406404_4e33cb289d_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
      'price': 10,
      'quantity': 1,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 50,
      'extremeWarning': [5, 30],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 60},
        {name: 'Harvest \r End', uv: 120}
      ],
      'zone': 6
    },
    {
      'name': 'grapes',
      'type': 'fruit',
      'x': 300,
      'y': 50,
      'img': 'https://c2.staticflickr.com/4/3942/33296407624_dcf0cc66f7_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
      'price': 10,
      'quantity': 1,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 50,
      'extremeWarning': [8, 35],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 14},
        {name: 'Bloom \r Start', uv: 52},
        {name: 'Harvest', uv: 80},
        {name: 'Harvest \r End', uv: 105}
      ],
      'zone': 6
    },
    {
      'name': 'watermelon',
      'type': 'fruit',
      'x': 350,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2912/33754040210_6c36b8074b_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
      'price': 3,
      'quantity': 20,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 55,
      'extremeWarning':[10, 40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 32},
        {name: 'Harvest', uv: 60},
        {name: 'Harvest \r End', uv: 80}
      ],
      'zone': 6
    },
    {
      'name': 'canteloupe',
      'type': 'fruit',
      'x': 400,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2873/33327563603_5715bcf622_o.png',
      'model': 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/plantModels/sunflowerModel.dae',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
      'price': 10,
      'quantity': 10,
      'season': 'Spring',
      'description': 'After Start State',
      'instructions': 'Take great care of me',
      'sunlight': 'Full-sun',
      'harvest': 49,
      'extremeWarning': [10, 40],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seed', uv: 7},
        {name: 'Bloom \r Start', uv: 32},
        {name: 'Harvest', uv: 60},
        {name: 'Harvest \r End', uv: 80}
      ],
      'zone': 6
    },
  ],
  tileDex: [
   { 'name': 'soil',
      'x': 50,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg',
      'stroke': 'black',
      'viability': true
    },
    { 'name': 'grass',
      'x': 104,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2923/33742489190_3e30fca5f7_o.jpg',
      'stroke': 'black',
      'viability': true

      },
      {
      'name': 'rocks',
      'x': 158,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2888/33316224483_1c8a775cf0_o.jpg',
      'stroke': 'black',
      'viability': false
    },
    {
      'name': 'gardenTile',
      'x': 212,
      'y': 50,
      'img': 'https://c1.staticflickr.com/3/2865/33285295564_e948bbe297_o.jpg',
      'stroke': 'black',
      'viability': false
    },
    {
      'name': 'gnome',
      'x': 104,
      'y': 150,
      'img': 'https://c1.staticflickr.com/3/2832/33285295044_f9354e513e_o.png',
      'stroke': 'black',
      'viability': false
    },
    {
      'name': 'RyanGnome',
      'x': 50,
      'y': 100,
      'img': 'https://c1.staticflickr.com/3/2936/34033385761_c776af67f7_o.png',
      'stroke': 'black',
      'viability': false
    },
    {
      'name': 'ArielGnome',
      'x': 104,
      'y': 100,
      'img': 'https://c1.staticflickr.com/3/2838/33779524940_77d4e0b1c5_o.png',
      'stroke': 'black',
      'viability': false
    },
    {
      'name': 'NathanGnome',
      'x': 158,
      'y': 100,
      'img': 'https://c1.staticflickr.com/3/2920/33353040833_da5d00443d_o.png',
      'stroke': 'black',
      'viability': false
    }
    ,{
      'name': 'SamyGnome',
      'x': 212,
      'y': 100,
      'img': 'https://c1.staticflickr.com/3/2910/34164510815_2e26ff97cd_o.png',
      'stroke': 'black',
      'viability': false
    },
    {
      'name': 'TreGnome',
      'x': 50,
      'y': 150,
      'img': 'https://c1.staticflickr.com/3/2816/33353374503_0dca33c3ba_o.png',
      'stroke': 'black',
      'viability': false
    }
  ],
  gardens: [],
  plants: [],
  gardenDropdown: [],
  gardenIndex: 0
};

/*SQUARE */
const toggleSquare = (state, action) => {
  let squareToToggle;
  let squareToToggleIndex;
  for (let i = 0; i < state.gardenGrid.length; i++) {
    let individualSquare = state.gardenGrid[i];
    if (individualSquare.x === action.x && individualSquare.y === action.y) {
      squareToToggle = individualSquare;
      squareToToggleIndex = i;
    }
  }
  let squareToToggleImg = squareToToggle.img;
  let tileToToggleTo = state.selectedTitle.img || 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/gardenTextures/soilTexture.jpg';
  let gardenXYCoordinatesCopy = state.gardenXYCoordinates.slice();
  gardenXYCoordinatesCopy[squareToToggleIndex].viability = state.selectedTitle.viability || true;
  let gardenCopy = state.gardenGrid.slice();
  gardenCopy[squareToToggleIndex].img = tileToToggleTo;
  let {gardenGrid} = state;
  let newState = {};
  Object.assign(newState, state, {gardenGrid: gardenCopy});
  return newState;
}

/*GARDEN*/
const setGardenParameters = (state, action) => {
  let newState = {};
  let {gardenGrid} = state;
  let idCounter = 0;
  let newSquareFootage =action.width * action.height;
  let gardenGridArray = [];
  let newGardenXYCoordinates=[];
  for (let i = 1; i < action.height + 1; i++) {
    for (let j =1; j < action.width + 1; j++) {
      let squareCounter = 'square' + idCounter;
      gardenGridArray.push({'x': i * 50 + 25, 'y': j * 50 + 25, 'img': 'https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg', 'viability': true});
      newGardenXYCoordinates.push({'x': i * 50 + 25, 'y': j * 50 + 25, 'viability': true});
      idCounter++;
    }
  }
  Object.assign(newState, state, {gardenGrid: gardenGridArray,
    gardenXYCoordinates: newGardenXYCoordinates, squareFootage: newSquareFootage});
  return newState;
}

const getAllGardens = (state, action) => {
  let newState = {};
  let {gardens} = state;
  Object.assign(newState, state, {gardens: action.dbGardenGrids});
  return newState;
}



const getGardenFromDropdown = (state, action) => {
  let newState = {};
  let { gardens } = state;
  let newGardenGrid = gardens[action.gardenIndex];
  let {gardenGrid} = state;
  Object.assign(newState, state, {gardenGrid: newGardenGrid});
  return newState;
};



const setDropdown = (state, action) => {
  let newState = {};
  let {gardenDropdown} = state;
  let newGardenDropdown = action.dbDropdownOptions;
  Object.assign(newState, state, {gardenDropdown: newGardenDropdown});
  return newState;
}

/*PLANTS*/
const getPlants = (state, action) => {
  let newState = {};
  let {plants} = state;
  Object.assign(newState, state, {plants: action.dbPlantGrids});
  return newState;
}

const getPlantsFromDropdown = (state, action) => {
  let newState = {};
  let { plants } = state;
  let newPlantGrid = plants[action.gardenIndex]; //NOTE: THIS STAYS THE SAME 'GRADEN.INDEX(?)
  let {plantGrid} = state;
  Object.assign(newState, state, {plantGrid: newPlantGrid});
  return newState;
};

const addPlantToPlantGrid = (state, action) => {
  let plantToMove;
  let plantToMoveIndex;
  let newState = {};
  let {plantGrid} = state;
  let oldPlantGrid = plantGrid.slice();
  let newPlantGrid = plantGrid.slice();
  let newAnalytics = {};
  Object.assign(newAnalytics, state.analytics);
  for(let i = 0; i < state.plantGrid.length; i++) {
    let individualPlant = state.plantGrid[i];
    if(individualPlant.x === action.plant.x && individualPlant.y === action.plant.y) {
      plantToMove = individualPlant;
      plantToMoveIndex = i;
    }
  }
  let harvestTableCopy = state.harvestTable.slice();
  const generateAnalytics = function(plantToBeAdded) {
    let today = new Date();
    let numberOfDaysToAdd = plantToBeAdded.plant.harvest;
    today.setDate(today.getDate() + numberOfDaysToAdd);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let y = today.getFullYear();
    let someFormattedDate = dd + '/'+ mm + '/'+ y;
    //increment the number of that plant if already in the library
    if (newAnalytics["plantLibrary"][plantToBeAdded.plant.name]) {
      newAnalytics["plantLibrary"][plantToBeAdded.plant.name]["quantity"]++;
    } else {
      //if plant has yet been added, instantiate a key value pair
      newAnalytics["plantLibrary"][plantToBeAdded.plant.name] = {};
      newAnalytics["plantLibrary"][plantToBeAdded.plant.name]["quantity"] = 1;
      harvestTableCopy.push({name: plantToBeAdded.plant.name, harvest:plantToBeAdded.plant.harvest, harvestDate: someFormattedDate});
      newAnalytics["totalCost"] += plantToBeAdded.plant.price;
      newAnalytics["numSeedPackets"]++;
    }
    if (plantToBeAdded.plant.type === "fruit") {
      newAnalytics["numFruits"]++;
    } else if (plantToBeAdded.plant.type ==="flower") {
      newAnalytics["numFlowers"]++;
    } else {
      newAnalytics["numVeggies"]++;
    }
  }

  /*Add the plant if there is no plant there already*/
  if(!plantToMoveIndex) {
    newPlantGrid.push(action.plant);
    generateAnalytics(action.plant);
    Object.assign(newState, state, {pastPlantGridStates: oldPlantGrid, plantGrid: newPlantGrid, analytics: newAnalytics, harvestTable: harvestTableCopy});
  } else {
    Object.assign(newState, state, {plantGrid: newPlantGrid});
  }
  return newState;
}

const setTooltip = (state, action) => {
  let newTooltip = !state.tooltipOpen;
  Object.assign(newState, state, {tooltipOpen: newTooltip});
  return newState;
};


const setTile = (state, action) => {
  let newTile;
  let indexOfTile;
  let newState = {};

  for (let i = 0; i < state.tileDex.length; i++)  {
    state.tileDex[i]['stroke'] = 'black';
    if (action.name === state.tileDex[i]['name']) {
      newTile = {};
      newTile= state.tileDex[i];
      indexOfTile = i;
    }
  }
  let tileDexCopy = state.tileDex.slice();
  tileDexCopy[indexOfTile]['stroke'] = 'yellow';
  Object.assign(newState, state, {selectedTitle: newTile, tileDex: tileDexCopy});
  return newState;
};

const setSeedPacket= (state, action) => {
  let newPacket = action.packet;
  let newState = {};
  Object.assign(newState, state, {seedPacket: newPacket});
  return newState;
};


const addToShelf= (state, action) => {
  let newShelfObject = action.shelfObject;
  let plantShelfCopy = state.plantShelf.slice();
  if (plantShelfCopy.length > 8) {
    plantShelfCopy.shift();
    for (let i = 0; i <plantShelfCopy.length; i++) {
      plantShelfCopy[i]['x'] = plantShelfCopy[i]['x'] - 50;
    }
  }
  let lastObject = plantShelfCopy[plantShelfCopy.length--];
  let lastObjectX = lastObject['x'];
  let lastObjectY = lastObject['y'];
  let newShelfX = lastObjectX + 50;
  let newShelfY = lastObjectY;
  newShelfObject['x'] = newShelfX;
  newShelfObject['y']= newShelfY;
  let newState = {};
  plantShelfCopy.push(newShelfObject)
  Object.assign(newState, state, {plantShelf: plantShelfCopy});
  return newState;
};

const undo = (state, action) => {
  let newState = {};
  let futurePlantGrid = state.plantGrid.slice();
  let oldPlantGrid = state.pastPlantGridStates.slice();
  let oldOldPlantGrid =state.pastPlantGridStates.slice();
  oldOldPlantGrid.pop();
  Object.assign(newState, state, {plantGrid: oldPlantGrid , pastPlantGridStates: oldOldPlantGrid, futurePlantGrideStates: futurePlantGrid});
  return newState;
};

const clear = (state, action) => {
  let newState = {};
  Object.assign(newState, state, {plantGrid: [], pastPlantGridStates: [], futurePlantGridStates: [], gardenGrid: [], gardenXYCoordinates:[]});
  return newState;
};

const setGrowthGraph = (state, action) => {
  let newState = {};
  let newGraph = action.graph;
  Object.assign(newState, state, {plantGrowthGraph: action.graph});
  return newState;
};

const setHeight = (state, action) => {
  let newState = {};
  Object.assign(newState, state, {height: action.height});
  return newState;
};

const setWidth = (state, action) => {
  let newState = {};
  Object.assign(newState, state, {width: action.width});
  return newState;
}

const setSuggestedPlants = (state, action) => {
  let newState = {};
  Object.assign(newState, state, {plantGrid: action.suggestedPlants});
  return newState;
}

const setSuggestedGarden = (state, action) => {
  let newState = {};
  Object.assign(newState, state, {gardenGrid: action.suggestedGarden});
  return newState;
}


const toggleVR = (state, action) => {
  let newState = {};
  Object.assign(newState, state, {viewIsTwoD: !state.viewIsTwoD});
  return newState;
}


const setDropdownStatus = (state, action) => {
  let newState = {};
  Object.assign(newState, state, {dropdownStatus: !action.dropdownStatus});
  return newState;
}


function gardenReducer(state = initialGardenState, action) {
  switch (action.type) {
  case 'TOGGLE_SQUARE':
    return toggleSquare(state, action);
  case 'SET_GARDEN_PARAMETERS':
    return setGardenParameters(state, action);
  case 'SET_TOOLTIP':
    return setTooltip(state, action);
  case 'SET_DROPDOWN_OPTIONS':
    return setDropdown(state, action);
  case 'GET_ALL_GARDENS':
    return getAllGardens(state, action);
  case 'GET_GARDEN_FROM_DROPDOWN':
    return getGardenFromDropdown(state, action);
  case 'GET_PLANTS_FROM_DROPDOWN':
    return getPlantsFromDropdown(state, action);
  case 'GET_PLANTS':
    return getPlants(state, action);
  case 'ADD_PLANT_TO_PLANT_GRID':
    return addPlantToPlantGrid(state, action);
  case 'SET_USER_PARAMETERS':
    return userProfile(state, action);
  case 'SET_SEED_PACKET':
    return setSeedPacket(state, action)
  case 'SET_TILE':
    return setTile(state, action)
  case 'ADD_TO_SHELF':
    return addToShelf(state, action)
  case 'UNDO':
    return undo(state, action)
  case 'REDO':
    return redo(state, action)
  case 'CLEAR':
    return clear(state, action)
  case 'TOGGLE_VR':
    return toggleVR(state, action)
  case 'ATTEMPT_THIS':
    return attemptThis(state, action)
  case 'SET_GROWTH_GRAPH':
    return setGrowthGraph(state, action);
  case 'SET_WIDTH':
    return setWidth(state, action);
  case 'SET_HEIGHT':
    return setHeight(state, action);
  case 'SET_SUGGESTED_GARDEN':
    return setSuggestedGarden(state, action);
  case 'SET_DROPDOWN_STATUS':
    return setDropdownStatus(state, action);
  case 'SET_SUGGESTED_PLANTS':
    return setSuggestedPlants(state, action);
  case 'LIKE_GARDEN':
    return likeGarden(state, action);
  case 'DISLIKE_GARDEN':
    return dislikeGarden(state, action);
  default:
    return state;
  }
}

export default gardenReducer;