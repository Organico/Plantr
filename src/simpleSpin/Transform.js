import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Stats from 'stats.js';
// import TrackballControls from '../trackball';
import TransformControls from 'three-transformcontrols'

class Transform extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    console.log("Transform HASE BEEN CREATED");

    this.test = 1000

    this.cameraPosition = new THREE.Vector3(1000, 500, 1000);
    this.lookAt = new THREE.Vector3(0, 200, 0)
    this.lightPosition = new THREE.Vector3(1, 1, 1)

    this._onAnimate = () => {

    };

    this.state = {
      cameraPosition: new THREE.Vector3(1000, 500, 1000)
    };
    console.log("this.state", this.state);

    this._onAnimate = () => {
      console.log("im animating homie")
      this.setState({
        cameraPosition: new THREE.Vector3(
          1000,
          this.state.cameraPosition.y + 0.1,
          1000
        )})
    };

  }

  componentDidMount() {
    this.stats = new Stats();

    console.log("this.stats yo", this.stats)

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    const {
      container,
      camera,
    } = this.refs;

    container.appendChild(this.stats.domElement);
    console.log("logging current dom element", this.stats.domElement)
    console.log("logging this.refs", this.refs, this.stte)

    // const controls = new TrackballControls(camera);
    this.controls = new TransformControls(camera, this.stats.domElement)
    this.controls.addEventListener( 'change', this._onButton );

    console.log("controls 2 right hurrrrr: ", this.controls)
    console.log("window is right here homit", window)
    window.addEventListener('keydown', function(event) {
      switch ( event.keyCode ) {
        case 81: // Q
          console.log("this.camera position", this)
          console.log("q pressed")
          break;
      }
    })

  }

  _onButton = () => {
    console.log("logging here")
  }

  // console.log("window is right here homit", window)
  // window.addEventListener( 'keydown', function ( event ) {
  //     switch ( event.keyCode ) {
  //       case 81: // Q
  //         console.log("q pressed")
  //         break;
  //     }
  //   }


  render() {
    const {
      width,
      height,
    } = this.props;

    const style = {};
    style.cursor = 'pointer';
    this.test -= 1;
    this.cameraPosition = new THREE.Vector3(this.test, 500, 1000);

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

    return (
    <div
      ref="container"
      style={style}
    >
      <React3
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

            position={this.state.cameraPosition}
            lookAt={this.lookAt}
            ref="camera"

          />
          <gridHelper size={1000} divisions={10} />
          <directionalLight color={0xffffff} intensity={2} position={this.lightPosition} />


                <mesh>
                  <boxGeometry
                    width={200}
                    height={200}
                    depth={200}
                  />
                  <meshBasicMaterial
                    color={new THREE.Color( this.props.color )}
                  />
                </mesh>


        </scene>
      </React3>
    </div>);
  }
}

export default Transform;