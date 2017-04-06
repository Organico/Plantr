import React from 'react';
import  { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { movePiece } from './action'


// export default class GardenSquare extends Component {
const GardenSquare = React.createClass({
  // static propTypes = {
  //   black: PropTypes.bool
  // };

  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return(
      <div style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%'
      }} onClick={(e) => {
                      this.props.dispatchMovePiece([2,2]);
                     console.log(e)
                   }}>
        {this.props.children}
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return{
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchMovePiece (location) {
      dispatch(movePiece(location))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GardenSquare)
