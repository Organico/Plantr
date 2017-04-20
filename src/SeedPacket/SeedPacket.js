import React, { Component } from 'react';
import { connect } from 'react-redux';


class SeedPacket extends Component {
  render() {

    // var newPacketImage = new Image();
    var imgUrl = this.props.seedPacket.packetImg;
     var style = {
      backgroundImage: 'url(' + imgUrl + ')',
    };

    console.log("The seed PACKET IMAGE IS ", style);

    return (
          <div className="col-md-12 flip3D">
              <div id="packetBack" className="back">
                <div id="packetText" >
                   <p>Name: {this.props.seedPacket.name}<br></br>
                  Price: {this.props.seedPacket.price}<br></br>Quantity: {this.props.seedPacket.quantity} seeds<br></br> Season: {this.props.seedPacket.season}<br></br>



                  </p>

                </div>
              </div>
              <div id="packetFront" className="front" style={style}></div>
          </div>
      )
  }
}


const mapStateToProps = (state) => {
  return {
    seedPacket: state.gardenReducer.seedPacket,
    plantGrid: state.gardenReducer.plantGrid,
    tooltipOpen: state.gardenReducer.tooltipOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SeedPacket);