import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import Plant from './Plant'

// import { togglePlant} from '../action'

class PlantShelf extends React.Component {
     constructor(...args) {
      super(...args);
      // this.state = {
      //   color: 'red',
      //   isDragging: false
      // };
      this.handleClick = this.handleClick.bind(this);
      this.dragBoundFunc = this.dragBoundFunc.bind(this);
      this.handleMouseDragStart = this.handleMouseDragStart.bind(this);
      this.handleMouseDragEnd = this.handleMouseDragEnd.bind(this);
    }
    handleClick() {
      // this.setState({
      //   color: Konva.Util.getRandomColor(),
      //   isDragging: true
      // });
      console.log("click!")
    }
    handleMouseOver(){
      document.body.style.cursor = 'pointer';
    }
    handleMouseOut(){
      document.body.style.cursor = 'default';
    }
    dragBoundFunc(pos) {
      var newY;
      var newY;
      var newX;

      if(pos.y < 50){
        newY = 25;
      } else if(pos.y < 100){
        newY = 75;
      } else if(pos.y < 150){
        newY = 125
      } else if(pos.y < 200){
        newY = 175
      } else {
        newY = pos.y;
      }

      if(pos.x < 50){
        newX = 25;
      } else if(pos.x < 100){
        newX = 75
      } else if(pos.x < 150){
        newX = 125
      } else if(pos.x < 200){
        newX = 175
      } else {
        newX = pos.x;
      }

      return {
        x: newX,
        y: newY
      };
    }

    handleMouseDragStart(pos){
      console.log("begin dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);
      // this.setState({isDragging: true})
    }

    handleMouseDragEnd(pos){
      console.log("end dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);
      var plant = {x: pos.evt.x, y: pos.evt.y, color: 'yellow'};
      this.props.dispatchAddPlantToPlantGrid(plant)
    }

    render() {
        return (
          <Group>
            {this.props.plantShelf.map((plantShelfPlant, i) =>
              <Plant
                key={i}
                x={plantShelfPlant.x}
                y={plantShelfPlant.y}
                color={plantShelfPlant.color}
              />
            )}
          </Group>
        );
    }
};

const mapStateToProps = (state) => {
  return {
    plantShelf: state.plantShelf,
    plants: state.plants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddPlantToPlantGrid (plant) {
      dispatch(addPlantToPlantGrid(plant))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantShelf)
// export default PlantShelf;