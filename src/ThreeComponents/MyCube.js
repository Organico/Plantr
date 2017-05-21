import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class MyCube extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    depth: React.PropTypes.number.isRequired,

  };

  constructor(props, context) {
    super(props, context);
    console.log("MYCUBE HASE BEEN CREATED");

    // this.cameraPosition = new THREE.Vector3(0, 10, 15);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    // this.state = {
    //   cubeRotation: new THREE.Euler(),
    // };

    // this._onAnimate = () => {
    //   // we will get this callback every frame

    //   // pretend cubeRotation is immutable.
    //   // this helps with updates and pure rendering.
    //   // React will be sure that the rotation has now updated.
    //   this.setState({
    //     cubeRotation: new THREE.Euler(
    //       this.state.cubeRotation.x + 0.1,
    //       this.state.cubeRotation.y + 0.1,
    //       0
    //     ),
    //   });
    // };
  }

  render() {
    const {
      width,
      height,
      depth,
      color,
      rotation
    } = this.props;

    // or you can use:
    // width = window.innerWidth
    // height = window.innerHeight

    return (

        <mesh
          position={this.props.position}
          rotation={this.props.rotation}
          castShadow
          receiveShadow
        >
          <boxGeometry
            width={this.props.width}
            height={this.props.height}
            depth={this.props.depth}
          />
          <meshBasicMaterial
            color={new THREE.Color( this.props.color )}
            color={new THREE.Color( this.props.color )}
          />
        </mesh>
    );
  }
}

export default MyCube;