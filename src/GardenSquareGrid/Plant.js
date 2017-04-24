import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import { addPlantToPlantGrid, setSeedPacket, setGrowthGraph } from '../Actions/GardenActions.js';



// import { togglePlant} from '../action'

class Plant extends React.Component {
     constructor(...args) {
      super(...args);


      this.handleClick = this.handleClick.bind(this);
      this.dragBoundFunc = this.dragBoundFunc.bind(this);
      this.handleMouseDragStart = this.handleMouseDragStart.bind(this);
      this.handleMouseDragEnd = this.handleMouseDragEnd.bind(this);



    }
    handleClick(e) {
      this.setState({
        color: Konva.Util.getRandomColor(),
        isDragging: this.props.isDragging,
        dispatchSetSeedPacket: this.props.dispatchSetSeedPacket
      });

    var seedObject = {
        'name': e.target.attrs.plant.name,
        'price': e.target.attrs.plant.price,
        'quantity':e.target.attrs.plant.quantity,
        'season': e.target.attrs.plant.season,
        'description': e.target.attrs.plant.description,
        'instructions': e.target.attrs.plant.instructions,
        'sunlight': e.target.attrs.plant.sunlight,
        'harvest': e.target.attrs.plant.harvest,
        'extremeWarning': e.target.attrs.plant.extremeWarning,
        'packetImg' : e.target.attrs.plant.packetImg
    }
     let seedGraph = e.target.attrs.plant.growthGraph;
     console.log("HERE", e.target.attrs.plant)
    console.log("**********THIS IS THE GROWTH GRAPH", seedGraph)
         this.props.dispatchSetGrowthGraph(seedGraph);

     this.props.dispatchSetSeedPacket(seedObject);
    }
    handleMouseOver(e){
      document.body.style.cursor = 'pointer';

    }
    handleMouseOut(){
      document.body.style.cursor = 'default';
    }

    dragBoundFunc(pos) {
      var newY;
      var newY;
      var newX;


      var roundedPosY= Math.round(pos.y/50)*50
      var roundedPosX= Math.round(pos.x/50)*50
      newY = roundedPosY;
      newX = roundedPosX;

      this.setState({
        posX: newX,
        posY: newY
      })

      return {
        x: newX,
        y: newY
      };


    }

    handleMouseDragStart(pos){

      this.setState({isDragging: true})
  var seedObject = {
        'name': pos.target.attrs.plant.name,
        'price': pos.target.attrs.plant.price,
        'quantity':pos.target.attrs.plant.quantity,
        'season': pos.target.attrs.plant.season,
        'description': pos.target.attrs.plant.description,
        'instructions': pos.target.attrs.plant.instructions,
        'sunlight': pos.target.attrs.plant.sunlight,
        'harvest': pos.target.attrs.plant.harvest,
        'extremeWarning': pos.target.attrs.plant.extremeWarning,
        'packetImg' : pos.target.attrs.plant.packetImg
    }
    let seedGraph = pos.target.attrs.plant.growthGraph;
    console.log("**********THIS IS THE GROWTH GRAPH", seedObject)
     this.props.dispatchSetSeedPacket(seedObject);
     this.props.dispatchSetGrowthGraph(seedGraph);
     // this.props.dispatchSetSeedPacket(seedObject);




    }

   handleMouseDragEnd(pos){

    var coordinates = this.props.gardenXYCoordinates;
    console.log("coordinates are ", coordinates)

    var isWithinGridBounds = false;

    for (var i = 0; i<coordinates.length; i++){
      var coordinateToCheck = coordinates[i];

      var coordinateToCheckX = coordinateToCheck['x']+25;
      var coordinateToCheckY = coordinateToCheck['y']+25;

      if (this.state.posX ===coordinateToCheckX && this.state.posY === coordinateToCheckY) {
        isWithinGridBounds = true;
        break;
      }
    }
    console.log("The plant's x value is ", this.state.posX)

    if(isWithinGridBounds) {
       var plant = {
        x: this.state.posX,
        y: this.state.posY,
        img: this.props.img,
        model: this.props.model,
        isDraggable: false,
        plant: this.props.plant

      };
      this.props.dispatchAddPlantToPlantGrid(plant)
    }


    }

    render() {
      let newImage = new Image();
      newImage.src = this.props.img;


      var plantthing = this.props.plantStats;


      let xOffset = (-1*this.props.x);
      let yOffset = this.props.y;

        return (
            <Circle
                id={"tooltip"}
                x={this.props.x} y={this.props.y} width={50} height={50}
                plant={this.props.plant}
                fillPatternImage={newImage}
                fillPatternOffset= {{ x: 25, y: 25}}
                shadowBlur={10}
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                draggable={this.props.isDraggable}
                dragBoundFunc={this.dragBoundFunc}
                onDragStart={this.handleMouseDragStart}
                onDragEnd={this.handleMouseDragEnd}
            />

        );

    }
}


const mapStateToProps = (state) => {
  return {
    plantGrid: state.gardenReducer.plantGrid,
    gardenXYCoordinates: state.gardenReducer.gardenXYCoordinates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
     dispatchAddPlantToPlantGrid (plant) {
      dispatch(addPlantToPlantGrid(plant))
    },
    dispatchSetSeedPacket (packet) {
      dispatch(setSeedPacket(packet))
    },
    dispatchSetGrowthGraph (graph) {
      dispatch(setGrowthGraph(graph))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Plant);


