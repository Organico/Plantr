
import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import MySquare from './MySquare'


const GardenGrid = React.createClass({
    render() {
      return (
        <Layer >
          {this.props.gardenGrid.map((gardenSquare, i) =>
            <MySquare key={i} x={gardenSquare.x} y={gardenSquare.y} img={gardenSquare.img} viability={gardenSquare.viability}/>)
          }
        </Layer>
      )
    }
})

const mapStateToProps = (state) => {
  return {
    gardenGrid: state.gardenReducer.gardenGrid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatchMovePiece (location) {
    //   dispatch(movePiece(location))
    // }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GardenGrid)


// export default MySquare





