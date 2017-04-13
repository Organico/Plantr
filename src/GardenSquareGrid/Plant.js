import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import { addPlantToPlantGrid } from '../Actions/GardenActions.js';



// import { togglePlant} from '../action'

class Plant extends React.Component {
     constructor(...args) {
      super(...args);


      this.handleClick = this.handleClick.bind(this);
      this.dragBoundFunc = this.dragBoundFunc.bind(this);
      this.handleMouseDragStart = this.handleMouseDragStart.bind(this);
      this.handleMouseDragEnd = this.handleMouseDragEnd.bind(this);

    }
    handleClick() {
      this.setState({
        color: Konva.Util.getRandomColor(),
        isDragging: this.props.isDragging
      });
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
      console.log("Pos in dragBoundFunc", pos);

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

      this.setState({
        posX: newX,
        posY: newY
      })

      console.log(this.state);

      return {
        x: newX,
        y: newY
      };


    }

    handleMouseDragStart(pos){
      console.log("begin dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);
      this.setState({isDragging: true})
    }

   handleMouseDragEnd(pos){
      console.log("end dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);


      var plant =
      {
        x: this.state.posX,
        y: this.state.posY,
        img: this.props.img,
        isDraggable: false
      };


      this.props.dispatchAddPlantToPlantGrid(plant)
      console.log("Drag end This.props", this.props)
    }

    render() {
      let image = this.props.plantGrid[0].img;

      let xOffset = (-1*this.props.x);
      let yOffset = this.props.y;
        return (
            <Circle
                x={this.props.x} y={this.props.y} width={50} height={50}
                fillPatternImage={this.props.img}
                fillPatternOffset= {{ x: 25, y: 25}}
                stroke={'black'}
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
    plantGrid: state.gardenReducer.plantGrid
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
     dispatchAddPlantToPlantGrid (plant) {
      dispatch(addPlantToPlantGrid(plant))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Plant);


