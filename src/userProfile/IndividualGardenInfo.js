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
      <div className="post row">
        <div className="col-md-2">
          <div className="row"></div>
          <div className="col-md-12 offset-md-3 post-picture" style={profilePic}></div>
          <div className="row">
            <div className="col-md-12 post-username">{ this.props.nickname }</div>
          </div>
        </div>
        <div className="col-md-8" onClick={ () => {this.props.onClick(); }}>
          <div>
            <h4 className="garden-name-active">{ this.props.gardenName }</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default IndividualGardenInfo;
