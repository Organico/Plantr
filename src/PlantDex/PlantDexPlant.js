import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import { addPlantToPlantGrid, setSeedPacket, addToShelf, setGrowthGraph} from '../Actions/GardenActions.js';



// import { togglePlant} from '../action'

class PlantDexPlant extends React.Component {
     constructor(...args) {
      super(...args);


      this.handleClick = this.handleClick.bind(this);

    }
    handleClick(e) {

    console.log("Event attributes are: ", e)
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
        'packetImg' : e.target.attrs.plant.packetImg,
        'img': e.target.attrs.plant.img,
        'isDraggable': true,
        'growthGraph': e.target.attrs.plant.growthGraph
    }
    this.props.dispatchAddToShelf(seedObject)
    this.props.dispatchSetSeedPacket(seedObject);
    let seedGraph = e.target.attrs.plant.growthGraph;
    this.props.dispatchSetGrowthGraph(seedGraph);
    }


    render() {
      let newImage = new Image();
      newImage.src = this.props.img;
      console.log("This.props is", this.props)


      var plantthing = this.props.plantStats;


      let xOffset = (-1*this.props.x);
      let yOffset = this.props.y;

        return (
            <Circle
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
    dispatchAddToShelf(shelfObject) {
      dispatch(addToShelf(shelfObject))
    },
     dispatchSetGrowthGraph (graph) {
      dispatch(setGrowthGraph(graph))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantDexPlant);


