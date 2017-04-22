import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class Ground extends React.Component {

  constructor(props, context) {
    super(props, context);

    // this.state = {
        //position and rotation
    // };

  }


  _onAnimate = () => {

  };

  componentDidMount(){
    // var grassLoader = new THREE.TextureLoader();
    // grassLoader.crossOrigin = '*'; // Use as needed
    // var grassTexture = grassLoader.load(this.props.map);
    // THREE.ImageUtils.crossOrigin = '';

    // this.refs.material.map = grassTexture;
  }


  render() {
    return (
          <mesh
            position={this.props.position}
            rotation={this.props.rotation}
            receiveShadow
          >
              <planeBufferGeometry
                width={this.props.width}
                height={this.props.height}
              />
              <meshPhongMaterial
                color={0xffffff}
                specular={0x111111}
              >
                <texture
                  url={this.props.url}
                  crossOrigin="*"
                  wrapS={THREE.RepeatWrapping}
                  wrapT={THREE.RepeatWrapping}
                  repeat={this.groundRepeat}
                  anisotropy={16}
                />
              </meshPhongMaterial>
          </mesh>
         );
  }
}
export default Ground;