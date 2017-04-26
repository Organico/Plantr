import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import Plant from './Plant'


const CostEstimate = React.createClass({
    render() {
      return (
        <div >
          <h1>Plantr Analytics</h1>
          <h2>Plants in your Garden</h2>
        </div>
      );
    }
})
const mapStateToProps = (state) => {
  return {
    plantGrid: state.gardenReducer.plantGrid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CostEstimate)
