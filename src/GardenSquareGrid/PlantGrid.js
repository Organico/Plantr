
import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import Plant from './Plant'


const PlantGrid = React.createClass({
    render() {
      console.log("in plant grid", this.props.plantGrid)
      return (
        <Layer >
          {this.props.plantGrid.map((plantSquare, i) =>
            <Plant key={i}
              x={plantSquare.x}
              y={plantSquare.y}
              stroke={plantSquare.stroke}
              img={plantSquare.img}
              model={plantSquare.model}
              plantStats ={plantSquare}
              isDraggable={plantSquare.isDraggable}
              plantZone={'8b'}
              />)
          }
        </Layer>

      )
    }
})

const mapStateToProps = (state) => {
  return {
    plantGrid: state.gardenReducer.plantGrid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatchMovePiece (location) {
    //   dispatch(movePiece(location))
    // }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantGrid)
