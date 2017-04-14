import React, { Component } from 'react';


class SeedPacket extends Component {
  render() {
    return (
          <div className="col-md-12 flip3D">
              <div id="packetBack" className="back">
                <div id="packetText">
                  Plant in direct sunlight. Water when they look dry. Cover if there is frost. Obvi.
                </div>
              </div>
              <div id="packetFront" className="front"></div>
          </div>
      )
  }
}


export default SeedPacket;