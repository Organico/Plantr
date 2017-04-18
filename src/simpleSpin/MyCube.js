import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class MyCube extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    console.log("MYCUBE HASE BEEN CREATED");

    this.cameraPosition = new THREE.Vector3(0, 10, 15);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    // or you can use:
    // width = window.innerWidth
    // height = window.innerHeight

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera below
      width={width}
      height={height}

      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
          lookAt={ new THREE.Vector3(0,0,0)}

        />
        <directionalLight color={0x404040} intensity={4} position={this.cameraPosition} />
        <gridHelper size={1000} divisions={10} />
        <mesh
          rotation={this.state.cubeRotation}
          castShadow
          receiveShadow
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={new THREE.Color( this.props.color )}
            color={new THREE.Color( this.props.color )}
          />
        </mesh>
      </scene>
    </React3>);
  }
}

export default MyCube;