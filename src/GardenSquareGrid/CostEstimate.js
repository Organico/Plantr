import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import Plant from './Plant'


const CostEstimate = React.createClass({
    render() {
      return (
        <div>
          <h1>Plantr Analytics</h1>
          <h3>Your Garden Stats</h3>
          <h4>The Cost of your Garden is: {this.props.plantGrid[0]['price']}</h4>
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
