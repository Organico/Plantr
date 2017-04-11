
import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import { toggleSquare} from '../action'


const MySquare = React.createClass({

    handleMouseOver(){
      document.body.style.cursor = 'pointer';
    },
    handleMouseOut(){
      document.body.style.cursor = 'default';
    },
    dragBoundFunc(pos) {
      var newY;
      console.log("this.state", this.state);
      console.log("this.props", this.props);
      console.log("this.pos", pos);

      var newY;
      var newX;


      if(pos.y < 50){
        newY = 10;
      } else if(pos.y < 100){
        newY = 60
      } else if(pos.y < 150){
        newY = 110
      } else if(pos.y < 200){
        newY = 160
      } else {
        newY = pos.y;
      }

      if(pos.x < 50){
        newX = 10;
      } else if(pos.x < 100){
        newX = 60
      } else if(pos.x < 150){
        newX = 110
      } else if(pos.x < 200){
        newX = 160
      } else {
        newX = pos.x;
      }

      return {
        x: newX,
        y: newY
      };
    },

    handleMouseDragStart(pos){
      console.log("begin dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);
      // this.setState({isDragging: true})
    },

    handleMouseDragEnd(pos){
      console.log("end dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);
      // this.setState({isDragging: false})

    },

    handleClick(e){
      console.log("in the handleClick function", this)
      console.log("event: ", e.target.attrs.x);

     this.props.dispatchToggleSquare(e.target.attrs.x, e.target.attrs.y)

    },

    render() {
        return (
            <Rect
                x={this.props.x} y={this.props.y} width={50} height={50}
                fill={this.props.color}
                stroke={'black'}
                shadowBlur={10}
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                // draggable={true}
                // dragBoundFunc={this.dragBoundFunc}
                onDragStart={this.handleMouseDragStart}
                onDragEnd={this.handleMouseDragEnd}
            />
        );
    }
})


const mapStateToProps = (state) => {
  return {
    // color: state.squareColor,
    // isDragging: state.isDragging,
    gardenGrid: state.gardenGrid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatchMovePiece (location) {
    //   dispatch(movePiece(location))
    // }
    dispatchToggleSquare(x, y){
      dispatch(toggleSquare(x,y))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MySquare)


// export default MySquare





