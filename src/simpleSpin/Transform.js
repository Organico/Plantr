import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class Transform extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    console.log("Transform HASE BEEN CREATED");

    this.cameraPosition = new THREE.Vector3(1000, 500, 1000);
    this.lookAt = new THREE.Vector3(0, 200, 0)

    this._onAnimate = () => {

    };
  }

  render() {
    const {
      width,
      height,
    } = this.props;
 const imageMaterial =  new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('https://static.pexels.com/photos/166651/pexels-photo-166651.jpeg')
    });

  var sphere = React.createElement(
            React3.Mesh,
            {
                geometry: new THREE.SphereGeometry(100, 32, 32),
                material: imageMaterial,
                position: new THREE.Vector3(0, 0, 0),
                scale: new THREE.Vector3(1, 1, -1),
                quaternion: new THREE.Quaternion()
            }
        );

 console.log("The color is ", this.props.color)
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
          fov={70}
          aspect={width / height}
          near={1}
          far={3000}

          position={this.cameraPosition}
          lookAt={this.lookAt}

        />
        <gridHelper size={1000} divisions={10} />
        <directionalLight color={0xffffff} intensity={2} position={(1,1,1)} />


         <mesh
        >
          <boxGeometry
            width={200}
            height={200}
            depth={200}
          />
          <meshBasicMaterial
            color={new THREE.Color( this.props.color )}
            map= {new THREE.ImageUtils.loadTexture('https://static.pexels.com/photos/166651/pexels-photo-166651.jpeg')}
          />
        </mesh>

      </scene>
    </React3>);
  }
}

export default Transform;