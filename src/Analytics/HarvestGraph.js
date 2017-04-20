import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';


const HarvestGraph = React.createClass({
    render() {
      return (
  <LineChart width={500} height={300} data={ [
      {name: 'Page A', uv: 0, pv: 0, amt: 2400},
      {name: 'Page B', uv: 10, pv: 20, amt: 2210},
      {name: 'Page C', uv: 14, pv: 25, amt: 2290},
      {name: 'Page D', uv: 40, pv: 50}
]}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
  </LineChart>
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

export default connect(mapStateToProps, mapDispatchToProps)(HarvestGraph)
