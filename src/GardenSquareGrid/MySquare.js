
import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux';
import { toggleSquare} from '../Actions/GardenActions.js';


const MySquare = React.createClass({

    handleMouseOver(){
      document.body.style.cursor = 'pointer';
    },
    handleMouseOut(){
      document.body.style.cursor = 'default';
    },

    handleMouseDragStart(pos){
      console.log("begin dragging", "x: ", pos.evt.x, "y: ", pos.evt.y);
      // this.setState({isDragging: true})
    },


    handleClick(e){
      console.log("in the handleClick function", this)
      console.log("the square properties are ", e)
      console.log("event: ", e.target.attrs.x);

     this.props.dispatchToggleSquare(e.target.attrs.x, e.target.attrs.y)

    },

    render() {
      let newImage = new Image();
      newImage.src = this.props.img
      console.log(this.props);
        return (
            <Rect
                x={this.props.x} y={this.props.y} width={50} height={50}
                fillPatternImage={newImage}
                fillPatternOffset= {{ x: 0, y: 0}}
                stroke={'black'}
                shadowBlur={10}
                onClick={this.handleClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                // draggable={true}
                // dragBoundFunc={this.dragBoundFunc}
                onDragStart={this.handleMouseDragStart}
                onDragEnd={this.handleMouseDragEnd}
                onDragover={this.handleDragover}
                onDragOver={this.handleDragOver}
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





