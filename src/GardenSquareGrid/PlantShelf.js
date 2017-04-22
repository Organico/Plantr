import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import Plant from './Plant'
import MyRect from './MyRectangle'

// import { togglePlant} from '../action'

class PlantShelf extends React.Component {
     constructor(...args) {
      super(...args);

      // this.handleClick = this.handleClick.bind(this);
      // this.dragBoundFunc = this.dragBoundFunc.bind(this);
      // this.handleMouseDragStart = this.handleMouseDragStart.bind(this);
      // this.handleMouseDragEnd = this.handleMouseDragEnd.bind(this);
    }
    // handleClick() {

    //   console.log("click!")
    // }
    // handleMouseOver(){
    //   document.body.style.cursor = 'pointer';
    // }
    // handleMouseOut(){
    //   document.body.style.cursor = 'default';
    // }
    // dragBoundFunc(pos) {
    //   var newY;
    //   var newY;
    //   var newX;

    //   var roundedPosY= Math.round(pos.y/50)*50-25
    //   var roundedPosX= Math.round(pos.x/50)*50-25

    //   newY = roundedPosY;
    //   newX = roundedPosX;
    //   return {
    //     x: newX,
    //     y: newY
    //   };
    // }

    // handleMouseDragStart(pos){
    //   console.log("begin dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);
    //   // this.setState({isDragging: true})
    // }

    // handleMouseDragEnd(pos){
    //   console.log("end dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);
    //   var plant = {x: pos.evt.x, y: pos.evt.y, color: 'yellow'};
    //   this.props.dispatchAddPlantToPlantGrid(plant)
    // }

    render() {
        console.log("The plant shelf is", this.props.plantShelf);
        return (
          <Group>
            <MyRect />
            {this.props.plantShelf.map((plantShelfPlant, i) =>
              <Plant
                key={i}
                x={plantShelfPlant.x}
                y={plantShelfPlant.y}
                img={plantShelfPlant.img}
                model={plantShelfPlant.model}
                isDraggable={plantShelfPlant.isDraggable}
                plant={plantShelfPlant}

              />
            )}
          </Group>
        );
    }
};

const mapStateToProps = (state) => {
  return {
    plantShelf: state.gardenReducer.plantShelf,
    plants: state.gardenReducer.plants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddPlantToPlantGrid (plant) {
      dispatch(addPlantToPlantGrid(plant))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantShelf)
// export default PlantShelf;