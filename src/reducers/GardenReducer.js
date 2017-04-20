const makeImage = function(urlsrc) {
  var newImage = new Image();
  newImage.src = urlsrc;
  return newImage;
};

console.log(makeImage('https://c1.staticflickr.com/3/2909/33168957064_a7ef238410_o.png'));
const initialGardenState = {
  location: [0, 2],
  isDragging: false,
  tooltipOpen: false,
  gardenXYCoordinates:[],
  selectedTitle: "https://c1.staticflickr.com/3/2923/33742489190_3e30fca5f7_o.jpg",

  pastPlantGridStates: [],
  futurePlantGrideStates: [],

  seedPacket:{
    'name': 'tomato',
    'price': 0,
    'quantity': 5,
    'season': "Spring",
    'description': "Initial State",
    'instructions': "Take good care of me",
    'sunlight': "Full-sun",
    'harvest':50,
    'extremeWarning':[0,45],
    'packetImg': '/seedPacketIMGs/tomatoResized.png'
  },
  plantGrowthGraph: [
      {name: 'Start Seedlings', uv: 0},
      {name: 'Sow', uv: 20},
      {name: 'Harvest', uv:45},
      {name: 'End', uv: 60}
],
  gardenGrid: [
  ],
  plantGrid: [
  ],

  plantShelf: [
    {
      'name': 'sunflower',
      'type': 'flower',
      'x':50,
      'y':600,
      'img':'https://c1.staticflickr.com/3/2909/33168957064_a7ef238410_o.png',
      'isDraggable': true,
       'packetImg' : '/seedPacketIMGs/KaleResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings Emerge', uv: 7},
        {name: 'Bloom Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'End', uv: 65}
      ],
    },
    {
      'name': 'potato',
      'type': 'vegetable',
      'x':100,
      'y':600,
      'img': 'https://c1.staticflickr.com/3/2844/33627640530_f866a32b60_o.png',
      'isDraggable': true,
       'packetImg' : '/seedPacketIMGs/KaleResized.png',
      'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    { 'name': 'tomato',
      'type': 'fruit',
      'x':150,
      'y':600,
      'img':'https://c1.staticflickr.com/3/2899/33972285536_46e0dbdb99_o.png',
      'isDraggable': true,
      'packetImg' : '/seedPacketIMGs/KaleResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ]
    },
    {
      'name': 'green bean',
      'type': 'vegetable',
      'x':200,
      'y':600,
      'img': 'https://c1.staticflickr.com/3/2939/33200675713_ea06c54442_o.png',
      'isDraggable': true,
      'packetImg' : '/seedPacketIMGs/KaleResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ]

    },
    {
      'name': 'onion',
      'type': 'vegetable',
      'x':250,
      'y':600,
      'img':'https://c1.staticflickr.com/3/2884/33883916601_9c04b38e73_o.png',
      'isDraggable': true,
      'packetImg' : '/seedPacketIMGs/KaleResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    {
      'name': 'okra',
      'type': 'vegetable',
      'x':300,
      'y':600,
      'img':'https://c1.staticflickr.com/3/2810/33856016232_8ed446a91d_o.png',
      'isDraggable': true,
      'packetImg' : '/seedPacketIMGs/KaleResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    { 'name': 'strawberry',
      'type': 'fruit',
      'x':350,
      'y':600,
      'img': 'https://c2.staticflickr.com/4/3954/33856016382_0778302b97_o.png',
      'isDraggable': true,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    }
  ],

  vegiDex: [
    {
      'name': 'okra',
      'type': 'vegetable',
      'x':50,
      'y':50,
      'img':'https://c1.staticflickr.com/3/2810/33856016232_8ed446a91d_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/GenericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    {
      'name': 'onion',
      'type': 'vegetable',
      'x':100,
      'y':50,
      'img':'https://c1.staticflickr.com/3/2884/33883916601_9c04b38e73_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/OnionResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ]
    },
    {
      'name': 'green bean',
      'type': 'vegetable',
      'x':150,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2939/33200675713_ea06c54442_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/beansResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ]
    },
    {
      'name': 'carrots',
      'type': 'vegetable',
      'x':200,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2869/33327563643_a7ffb81e43_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/carrotResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ]
    },
    {
      'name': 'kale',
      'type': 'vegetable',
      'x':250,
      'y':50,
      'img': 'https://c2.staticflickr.com/4/3937/33296262464_4c75638658_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/KaleResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    {
      'name': 'snappeas',
      'type': 'vegetable',
      'x':300,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2919/34013204631_519165ee45_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    {
      'name': 'potato',
      'type': 'vegetable',
      'x':350,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2844/33627640530_f866a32b60_o.png',
      'isDraggable': false,
       'packetImg' : '/seedPacketIMGs/KaleResized.png',
      'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
      {
      'name': 'corn',
      'type': 'vegetable',
      'x':400,
      'y':50,
      'img': 'https://c2.staticflickr.com/4/3937/33984681002_35a872f2f2_o.png',
      'isDraggable': false,
       'packetImg' : '/seedPacketIMGs/cornResized.png',
      'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
      {
      'name': 'pumpkin',
      'type': 'vegetable',
      'x':450,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2878/33299363694_29057af863_o.png',
      'isDraggable': false,
       'packetImg' : '/seedPacketIMGs/PumpkinResized.png',
      'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
     {
      'name': 'chili pepper',
      'type': 'vegetable',
      'x':50,
      'y':100,
      'img': 'https://c1.staticflickr.com/3/2847/33984618022_9fb8c0250c_o.png',
      'isDraggable': false,
       'packetImg' : '/seedPacketIMGs/hotPeppersResized.png',
      'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
     {
      'name': 'cucumber',
      'type': 'vegetable',
      'x':100,
      'y':100,
      'img': 'https://c1.staticflickr.com/3/2830/33757226270_b439776485_o.jpg',
      'isDraggable': false,
       'packetImg' : '/seedPacketIMGs/genericResized.png',
      'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
     {
      'name': 'cucumber',
      'type': 'vegetable',
      'x':150,
      'y':100,
      'img': 'https://c1.staticflickr.com/3/2820/33984617052_066c5379e9_o.png',
      'isDraggable': false,
       'packetImg' : '/seedPacketIMGs/genericResized.png',
      'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    }







  ],



  fruitDex: [
   { 'name': 'strawberry',
      'type': 'fruit',
      'x':50,
      'y':50,
      'img': 'https://c2.staticflickr.com/4/3954/33856016382_0778302b97_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    { 'name': 'tomato',
      'type': 'fruit',
      'x':100,
      'y':50,
      'img':'https://c1.staticflickr.com/3/2899/33972285536_46e0dbdb99_o.png',
      'isDraggable': true,
      'packetImg' : '/seedPacketIMGs/KaleResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
      },
      {
      'name': 'pineapple',
      'type': 'fruit',
      'x':150,
      'y':50,
      'img':'https://c1.staticflickr.com/3/2850/33754040130_3aef5cfda7_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    {
      'name': 'orange',
      'type': 'fruit',
      'x': 200,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2813/33754040170_f89bbcf2d6_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
     {
      'name': 'apple',
      'type': 'fruit',
      'x': 250,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2839/33296406404_4e33cb289d_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    {
      'name': 'grapes',
      'type': 'fruit',
      'x': 300,
      'y':50,
      'img': 'https://c2.staticflickr.com/4/3942/33296407624_dcf0cc66f7_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    {
      'name': 'watermelon',
      'type': 'fruit',
      'x': 350,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2912/33754040210_6c36b8074b_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ],
    },
    {
      'name': 'canteloupe',
      'type': 'fruit',
      'x': 400,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2873/33327563603_5715bcf622_o.png',
      'isDraggable': false,
      'packetImg' : '/seedPacketIMGs/genericResized.png',
       'price': 10,
      'quantity': 10,
      'season': "Spring",
      'description': "After Start State",
      'instructions': "Take great care of me",
      'sunlight': "Full-sun",
      'harvest':40,
      'extremeWarning':[0,45],
      'growthGraph': [
        {name: 'Sow', uv: 0},
        {name: 'Seedlings \r Emerge', uv: 7},
        {name: 'Bloom \r Start', uv: 45},
        {name: 'Harvest', uv: 50},
        {name: 'Harvest \r End', uv: 65}
      ]
    },
  ],
  tileDex: [
   { 'name': 'soil',
      'x':50,
      'y':50,
      'img': "https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg",
      'stroke': 'black'
    },
    { 'name': 'grass',
      'x':104,
      'y':50,
      'img':"https://c1.staticflickr.com/3/2923/33742489190_3e30fca5f7_o.jpg",
      'stroke': 'black'

      },
      {
      'name': 'rocks',
      'x':158,
      'y':50,
      'img':'https://c1.staticflickr.com/3/2888/33316224483_1c8a775cf0_o.jpg',
      'stroke': 'black'

    },
    {
      'name': 'gardenTile',
      'x': 212,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2865/33285295564_e948bbe297_o.jpg',
      'stroke': 'black'

    },
    {
      'name': 'gnome',
      'x': 266,
      'y':50,
      'img': 'https://c1.staticflickr.com/3/2832/33285295044_f9354e513e_o.png',
      'stroke': 'black'

    }
  ],
  gardens: [],
  plants: [],
  gardenDropdown: [],
  gardenIndex: 0
};

/*SQUARE */
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


  var squareToToggleImg = squareToToggle.img;
    console.log("HERE", squareToToggleImg);

  var tileToToggleTo = state.selectedTitle;


  var gardenCopy = state.gardenGrid.slice();
  gardenCopy[squareToToggleIndex].img = tileToToggleTo

  const {gardenGrid} = state;
  const newState = {};

  Object.assign(newState, state, {gardenGrid: gardenCopy})

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
}



/*GARDEN*/
const setGardenParameters = (state, action) => {
  const newState = {};

  const {gardenGrid} = state;
  var idCounter = 0;

  var gardenGridArray = [];
  var newGardenXYCoordinates=[];
  for (var i = 1; i < action.height + 1; i++ ) {
    for (var j =1; j < action.width + 1; j++) {
      var squareCounter = "square" + idCounter;
      gardenGridArray.push({'x': i * 50, 'y': j * 50, 'img': "https://c1.staticflickr.com/3/2818/33742487580_30e485f9ac_o.jpg"});
      newGardenXYCoordinates.push({'x': i * 50, 'y': j * 50})
      idCounter++;
    }
  }
  Object.assign(newState, state, {gardenGrid: gardenGridArray,
    gardenXYCoordinates: newGardenXYCoordinates});
  return newState;
}

const getAllGardens = (state, action) => {
  console.log(makeImage('https://c1.staticflickr.com/3/2909/33168957064_a7ef238410_o.png'));

  console.log('(before) state: ', state);

  const newState = {};
  const {gardens} = state;

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
  const {gardenGrid} = state;

  Object.assign(newState, state, {gardenGrid: newGardenGrid});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);

  return newState;
};



const setDropdown = (state, action) => {

  const newState = {};
  const {gardenDropdown} = state;

  var newGardenDropdown = action.dbDropdownOptions
  Object.assign(newState, state, {gardenDropdown: newGardenDropdown});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);

  return newState;
}

/*PLANTS*/
const getAllPlants = (state, action) => {
  const newState = {};
  const {plants} = state;

  Object.assign(newState, state, {plants: action.dbPlantGrids});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);

  return newState;
}

const getPlantsFromDropdown = (state, action) => {
  console.log('(before) state: ', state);
  const newState = {};
  const { plants } = state

  var newPlantGrid = plants[action.gardenIndex]; //NOTE: THIS STAYS THE SAME "GRADEN.INDEX(?)
  const {plantGrid} = state;

  Object.assign(newState, state, {plantGrid: newPlantGrid});
  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);

  return newState;
};

const addPlantToPlantGrid = (state, action) => {

  var plantToMove;
  var plantToMoveIndex;
  const newState = {};
  const {plantGrid} = state;
  var oldPlantGrid = plantGrid.slice();
  var newPlantGrid = plantGrid.slice();


  for(var i = 0; i < state.plantGrid.length; i++){
    var individualPlant = state.plantGrid[i];
    if(individualPlant.x === action.plant.x && individualPlant.y === action.plant.y){
      plantToMove = individualPlant
      plantToMoveIndex = i
    }
  }

  if(!plantToMoveIndex){
    console.log("SAMY IN FIRST")
    console.log("THIS IS THE PLANT!!!", action.plant)
    newPlantGrid.push(action.plant);
  Object.assign(newState, state, {pastPlantGridStates: oldPlantGrid, plantGrid: newPlantGrid});
  } else {
    Object.assign(newState, state, {plantGrid: newPlantGrid});
  }







  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);

  return newState
}

const setTooltip = (state, action) => {
  var newTooltip = !state.tooltipOpen;

  Object.assign(newState, state, {tooltipOpen: newTooltip});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};


const setTile = (state, action) => {
  var newTile;
  var indexOfTile;
  const newState = {};

  for (var i = 0; i<state.tileDex.length; i++)  {
    state.tileDex[i]['stroke'] = 'black'
    if (action.name === state.tileDex[i]['name']) {
      console.log("I FOUND YOU")
      newTile = state.tileDex[i]['img'];
      indexOfTile = i;
    }
  }

  var tileDexCopy = state.tileDex.slice();
  tileDexCopy[indexOfTile]['stroke'] = 'yellow'

  console.log("THE TILE NAME IS", action.name);

  Object.assign(newState, state, {selectedTitle: newTile, tileDex: tileDexCopy});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};

const setSeedPacket= (state, action) => {
  var newPacket = action.packet

  const newState = {};


  Object.assign(newState, state, {seedPacket: newPacket});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};


const addToShelf= (state, action) => {
  var newShelfObject = action.shelfObject
  var plantShelfCopy = state.plantShelf.slice();

  if (plantShelfCopy.length>8){
    plantShelfCopy.shift();
    for (var i = 0; i<plantShelfCopy.length; i++){
      plantShelfCopy[i]['x'] = plantShelfCopy[i]['x']-50
    }
  }

  console.log("New shelf before changes", newShelfObject)

  var lastObject = plantShelfCopy[plantShelfCopy.length-1];
  var lastObjectX = lastObject['x'];
  var lastObjectY = lastObject['y'];

  var newShelfX = lastObjectX+50;
  var newShelfY = lastObjectY;

  newShelfObject['x'] = newShelfX;
  newShelfObject['y']= newShelfY;

  console.log("New shelf after coordinate change", newShelfObject);


  const newState = {};


  plantShelfCopy.push(newShelfObject)


  Object.assign(newState, state, {plantShelf: plantShelfCopy});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};

const undo= (state, action) => {
  const newState = {};
  var futurePlantGrid = state.plantGrid.slice();
  var oldPlantGrid = state.pastPlantGridStates.slice();
  var oldOldPlantGrid =state.pastPlantGridStates.slice();
  oldOldPlantGrid.pop();




  Object.assign(newState, state, {plantGrid: oldPlantGrid , pastPlantGridStates: oldOldPlantGrid, futurePlantGrideStates: futurePlantGrid});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};

const clear = (state, action) => {
  const newState = {};

  Object.assign(newState, state, {plantGrid: [], pastPlantGridStates: [], futurePlantGrideStates: []});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};

const setGrowthGraph = (state, action) => {
  console.log("INSIDE THE GROWTH GRAPHHHHHHH", action.graph)
  const newState = {};
  const newGraph = action.graph;

  Object.assign(newState, state, {plantGrowthGraph: action.graph});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
}


function gardenReducer(state = initialGardenState, action) {
  console.log('GardenReducer.js - Reducer called');
  console.log('current action: ', action);
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
  case 'GET_ALL_PLANTS':
    return getAllPlants(state, action);
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
  case 'SET_GROWTH_GRAPH':
    return setGrowthGraph(state, action);
  default:
    return state;
  }
}



export default gardenReducer;