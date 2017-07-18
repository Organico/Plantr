import React, { Component } from 'react';

class IndividualGardenInfo extends Component {
  render() {
    let profilePic = {
      height: '50px',
      width: '50px',
      backgroundImage: 'url(' + this.props.profilePicture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '50%'
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="row"></div>
            <div className="col-md-12 offset-md-3 postPicture" style={profilePic}></div>
            <div className="row">
              <div className="col-md-12 postUsername">{ this.props.nickname }</div>
            </div>
          </div>
          <div className="row" onClick={ () => {this.props.onClick(); }}>
            <div className="col-md-8 offset-md-2 gardenName">{ this.props.gardenName }</div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndividualGardenInfo;
