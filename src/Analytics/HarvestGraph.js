import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';


const HarvestGraph = React.createClass({
    render() {
      return (
  <LineChart width={500} height={300} data={this.props.plantGrowthGraph}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  </LineChart>
      );
    }
})

const mapStateToProps = (state) => {
  return {
    plantGrid: state.gardenReducer.plantGrid,
    plantGrowthGraph: state.gardenReducer.plantGrowthGraph
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HarvestGraph)
