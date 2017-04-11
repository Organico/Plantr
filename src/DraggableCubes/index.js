import React from 'react';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import * as THREE from 'three';
import Stats from 'stats.js';

import React3 from 'react-three-renderer';

import ExampleBase from '../ExampleBase';

import TrackballControls from '../trackball';

import MouseInput from '../inputs/MouseInput';

import AllCubes from './AllCubes';

class DraggableCubes extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 1000),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
      hovering: false,
      dragging: false,
    };

    this._cursor = {
      hovering: false,
      dragging: false,
    };

    this.lightPosition = new THREE.Vector3(0, 500, 2000);
    this.lightTarget = new THREE.Vector3(0, 0, 0);

    this.directionalLightPosition = new THREE.Vector3(50, 200, 100).multiplyScalar(1.3);
    // this.lightTarget = new THREE.Vector3(0, 0, 0);
    this.groundPosition = new THREE.Vector3(0, -25, 0);
    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0);
    this.groundRepeat = new THREE.Vector2(25, 25);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  componentDidMount() {
    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    const {
      container,
      camera,
    } = this.refs;

    container.appendChild(this.stats.domElement);
    console.log("logging current dom element", this.stats.domElement)
    console.log("logging this.refs", this.refs)
    console.log("logging this.refs.container", this.refs.container.children[0])

    const controls = new TrackballControls(camera, this.refs.container.children[0]);

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

  _onCubesMounted = (cubes) => {
    this.cubes = cubes;
  };

  _onHoverStart = () => {
    this.setState({
      hovering: true,
    });
  };

  _onHoverEnd = () => {
    this.setState({
      hovering: false,
    });
  };

  _onDragStart = () => {
    this.setState({
      dragging: true,
    });
  };

  _onDragEnd = () => {
    this.setState({
      dragging: false,
    });
  };


  componentDidUpdate(newProps) {
    const {
      mouseInput,
    } = this.refs;

    const {
      width,
      height,
    } = this.props;

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
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
      mouseInput.restrictIntersections(this.cubes);
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

    if (dragging) {
      style.cursor = 'move';
    } else if (hovering) {
      style.cursor = 'pointer';
    }

    this._cursor.hovering = hovering;
    this._cursor.dragging = dragging;

    return (<div
      ref="container"
      style={style}
    >
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
        sortObjects={false}
        shadowMapEnabled
        shadowMapType={THREE.PCFShadowMap}
        clearColor={0xf0f0f0}
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
        <resources>
          <boxGeometry
            resourceId="boxGeometry"

            width={90}
            height={90}
            depth={90}
          />
          <meshBasicMaterial
            resourceId="highlightMaterial"

            color={0xffff00}
            wireframe
          />
        </resources>
        <scene ref="scene">
          <perspectiveCamera
            fov={70}
            aspect={width / height}
            near={1}
            far={10000}
            name="mainCamera"
            ref="camera"
            position={cameraPosition}
            rotation={cameraRotation}
          />
          <ambientLight
            color={0xc2327}
          />
          <spotLight
            color={0xffffff}
            intensity={4}
            position={this.lightPosition}
            lookAt={this.lightTarget}

            castShadow
            shadowCameraNear={200}
            shadowCameraFar={10000}
            shadowCameraFov={50}

            shadowBias={-0.00022}

            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />
          <AllCubes
            mouseInput={mouseInput}
            camera={camera}

            onCubesMounted={this._onCubesMounted}

            onHoverStart={this._onHoverStart}
            onHoverEnd={this._onHoverEnd}
            onDragStart={this._onDragStart}
            onDragEnd={this._onDragEnd}

            cursor={this._cursor}
          />

      <mesh
        position={this.groundPosition}
        rotation={this.groundRotation}
        receiveShadow
      >
        <planeBufferGeometry
          width={20000}
          height={20000}
        />
        <meshPhongMaterial
          color={0xffffff}
          specular={0x111111}
        >

        </meshPhongMaterial>
      </mesh>

        </scene>
      </React3>
    </div>);
  }
}

export default DraggableCubes;
