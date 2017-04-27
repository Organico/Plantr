import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const PlantBreakdown = React.createClass({
    render() {

      // let gardenToTraverseForData = this.props.plantGrid;

      // for () {

      // }

      console.log(this.props.analytics)
      console.log("HERE ARE THE PROPS ", this.props)
      const data = [
      {name: 'Vegetables', Veggies: this.props.analytics.numVeggies},
      {name: 'Fruits', Fruits: this.props.analytics.numFruits},
      {name: 'Flowers', Flowers: this.props.analytics.numFlowers}
];
      return (
        <div className="lineChart">
      <BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="Veggies" fill="#8884d8" />
       <Bar dataKey="Fruits" fill="#82ca9d" />
       <Bar dataKey="Flowers" fill="#c42929" />


      </BarChart>
      </div>
      );
    }
})

const mapStateToProps = (state) => {
  return {
    analytics: state.gardenReducer.analytics,
    plantGrowthGraph: state.gardenReducer.plantGrowthGraph
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantBreakdown)