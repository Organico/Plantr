import React from 'react';
import { connect } from 'react-redux'

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Stats from 'stats.js';

import OBJLoader from 'three-obj-loader'
OBJLoader(THREE);
import MTLLoader from 'three-mtl-loader'
import TrackballControls from '../trackball';
import MouseInput from '../inputs/MouseInput';
import HouseCube from './HouseCube';

// import GrassCube from './GrassCube';
import MaterialCube from './MaterialCube';
import MaterialGrid from './MaterialGrid';

import NewPlantModel from './NewPlantModel'
import ThreePlantGrid from './ThreePlantGrid'

import MyCube from './MyCube'
// import PlantModel from './PlantModel'
import MonkeyModel from './MonkeyModel'
import ColladaLoader from 'three-collada-loader';

import Ground from './Ground'
import CubeMapTest from './CubeMapTest'



// import EffectComposer from 'three-effectcomposer';
// console.log("EffectComposer: ", EffectComposer)
// EffectComposer(THREE);
// console.log("EffectComposer: ", EffectComposer)

class Transform extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 300, 1000),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
      hovering: false,
      dragging: false,
      cubeRotation: new THREE.Euler(),
      cubePosition: new THREE.Vector3(0,0,0)
    };



    // this.cameraPosition = new THREE.Vector3(0, 500, 1000);
    this.lookAt = new THREE.Vector3(0, 200, 0)
    this.lightPosition = new THREE.Vector3(1, 1, 1)
    THREE.ImageUtils.crossOrigin = ''; //moved from render()
    this.object;

    this.groundPosition = new THREE.Vector3(0, -25, 0);
    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0);
    this.groundRepeat = new THREE.Vector2(25, 25);

  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onAnimate = () => {
    this._onAnimateInternal();


    var orbitCalculation = function(radius) {
        return {x: (Math.sin((Date.now()%60000)/15000 * Math.PI * 2) * radius),
                z: (Math.cos((Date.now()%60000)/15000 * Math.PI * 2) * radius)};
    }

    this.setState({
      cubeRotation: new THREE.Euler(
        this.state.cubeRotation.x + 0.1,
        this.state.cubeRotation.y + 0.1,
        0
      ),
    //   cubePosition: new THREE.Vector3(
    //     this.state.cubePosition.x + 0.1,
    //     this.state.cubePosition.y + 0.1,
    //     0
    //   )
      cubePosition: new THREE.Vector3(
        orbitCalculation(500).x,
        0,
        orbitCalculation(500).z
      )
    });

  };

  componentDidMount(){

    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    const {
      container,
      camera,
      react3,
      scene
    } = this.refs;

    container.appendChild(this.stats.domElement);

    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;
    this.controls.addEventListener('change', this._onTrackballChange);


  }

  _onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };

  componentWillUnmount() {
    this.controls.removeEventListener('change', this._onTrackballChange);

    this.controls.dispose();
    delete this.controls;

    delete this.stats;
  }

 _onAnimateInternal() {
    const {
      mouseInput,
      camera,
    } = this.refs;

    if (!mouseInput.isReady()) {
      const {
        scene,
        container,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      // mouseInput.restrictIntersections(this.cubes);
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({
        mouseInput,
      });
    }

    if (this.state.camera !== camera) {
      this.setState({
        camera,
      });
    }

    this.stats.update();
    this.controls.update();
  }

          //   <MyCube
          //   width={100}
          //   height={100}
          //   depth={100}
          //   color={0x654321}
          //   rotation={this.state.cubeRotation}
          //   position={this.state.cubePosition}
          // />

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      cameraPosition,
      cameraRotation,

      mouseInput,
      camera,

      hovering,
      dragging,
    } = this.state;

    const style = {};

    var grassLoader = new THREE.TextureLoader();
    grassLoader.crossOrigin = '*'; // Use as needed
    var grassTexture = grassLoader.load('https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg');


    return (
    <div
      ref="container"
      style={style}
    >
      <React3
        mainCamera="camera" // this points to the perspectiveCamera below
        width={width}
        height={height}
        antialias
        sortObjects={false}
        onAnimate={this._onAnimate}
        shadowMapEnabled
        shadowMapType={THREE.PCFShadowMap}
        clearColor={0x7EC0EE}

        ref="react3"
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
        <scene ref="scene">
          <perspectiveCamera
            name="camera"
            fov={70}
            aspect={width / height}
            near={1}
            far={3000}
            ref="camera"
            position={cameraPosition}
            lookAt={this.lookAt}
          />
          <ambientLight
            color={new THREE.Color("white")}
          />
          <gridHelper size={1000} divisions={10} />
          <directionalLight color={0xffffff} intensity={5} position={new THREE.Vector3(1, 1, 1)} />




          <MaterialGrid />
          <ThreePlantGrid />

          <CubeMapTest
            width={1000}
            height={1000}
            depth={1000}
            position={new THREE.Vector3(
              0,
              500,
              0
            )}
           />

          <MaterialCube
            width={100}
            height={100}
            depth={100}
            map={"https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg"}
            position={new THREE.Vector3(
              -10,
              200,
              0
            )}
          />


          <NewPlantModel
            position= {new THREE.Vector3(100,0,0)}
            daeFile = {"https://s3-us-west-2.amazonaws.com/ryaperry-bucket/tomatoeTest.dae"}
          />




        </scene>
      </React3>
    </div>);
  }
}

// const mapStateToProps = (state) => {
//   return {
//     gardenGrid: state.gardenReducer.gardenGrid
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // dispatchMovePiece (location) {
//     //   dispatch(movePiece(location))
//     // }
//   }
// };


// export default connect(mapStateToProps, mapDispatchToProps)(Transform)

export default Transform;


          // <HouseCube
          //   rotation={new THREE.Vector3(0,0,0)}
          //   position={new THREE.Vector3(-150,0,-900)}
          // />

          // <Ground
          //   position={this.groundPosition}
          //   rotation={this.groundRotation}
          //   width={10000}
          //   height={10000}
          //   url={'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg'}
          // />
