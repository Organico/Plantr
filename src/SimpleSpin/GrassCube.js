import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import TrackballControls from '../trackball';
import MouseInput from '../inputs/MouseInput';


class GrassCube extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    depth: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    map: React.PropTypes.string.isRequired
  };
  constructor(props, context) {
    super(props, context);

    // this.state = {
        //position and rotation
    // };

  }


  _onAnimate = () => {
  };

  componentDidMount(){

  }


  render() {


    var grassLoader = new THREE.TextureLoader();
    grassLoader.crossOrigin = '*'; // Use as needed
    var grassTexture = grassLoader.load(this.props.map);

    return (
          <mesh>
              <boxGeometry
                width={this.props.width}
                height={this.props.height}
                depth={this.props.depth}
              />
              <meshBasicMaterial
                color={new THREE.Color( this.props.color )}
                map= {THREE.ImageUtils.loadTexture(this.props.map)}
              />
          </mesh>
         );
  }
}
export default GrassCube;