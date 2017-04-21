import React from 'react';
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
import GrassCube from './GrassCube';
import MyCube from './MyCube'
import PlantModel from './PlantModel'
import MonkeyModel from './MonkeyModel'
import ColladaLoader from 'three-collada-loader';

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



        // load ascii model

        // var jsonLoader = new THREE.JSONLoader();
        // jsonLoader.load( "https://s3-us-west-2.amazonaws.com/ryaperry-bucket/sunflower.json", createScene );

        // // load binary model

        // // var binLoader = new THREE.BinaryLoader();
        // // binLoader.load( "Model_bin.js", createScene );

        // function createScene( geometry, materials ) {
        //   console.log("in createScene......................")

        //     var mesh = new THREE.Mesh( geometry, new THREE.MultiMaterial( materials ) );
        //   console.log("in createScene......................", mesh)
        //   console.log("in createScene......................", geometry)

        //   // scene.add(geometry);
        //   scene.add(mesh);
        //   console.log("scene after adding mesh", scene)

        // }

        // console.log("jsonLoader ================= ", jsonLoader)



              var colladaLoader = new ColladaLoader()
              colladaLoader.options.convertUpAxis = true;
              // colladaLoader.load("https://s3-us-west-2.amazonaws.com/ryaperry-bucket/firstTree/firstTree1.dae", function(collada){
              colladaLoader.load("https://s3-us-west-2.amazonaws.com/ryaperry-bucket/sectionize_sunflower2.dae", function(collada){
                console.log("collada Loader loded successfully !!!!!", collada)
                var dae = collada.scene;
                console.log("Resulting DAE!Before!!!! ", dae)

                // dae.scale.x = dae.scale.y = dae.scale.z = 300

                console.log("Resulting DAE!!adsf!!! ", dae)

                // dae.traverse(function(child){
                //   if (child.colladaId == "Suzanne"){
                //       // child.traverse(function(e){
                //       //     e.castShadow = true;
                //       //     e.receiveShadow = true;
                //           // if(e.material instanceof THREE.MeshPhongMaterial){
                //           //     e.material.needsUpdate = true;
                //           //     console.log("e.material in travers", e.material)
                //           // }
                //       // })
                //       scene.add(child);
                //   }

                //   else if ( child. colladaId == "Plane"){
                //       // child.traverse(function(e){
                //       //     e.castShadow = true;
                //       //     e.receiveShadow = true;
                //       // })
                //       console.
                //   }
                // })

                // dae.updateMatrix()
                console.log("dae children of 2: ", dae.children[2])
                var child = dae.children[4]
                var child2 = dae.children[6]
                child.scale.set(40,40,40)
                child2.scale.set(40,40,40)
                // // child.children[0].scale.set(30,30,30)
                scene.add(child)
                scene.add(child2)
              })

              // var jsonLoader = new THREE.JSONLoader()
              // jsonLoader.load("https://s3-us-west-2.amazonaws.com/ryaperry-bucket/monkey.json", function(jsonResponse){
              //   console.log("jsonResponse Loader loded successfully !!!!!", jsonResponse)

              //   console.log("Resulting JSON!!!!! ", jsonResponse)

              // var objLoader = new THREE.ObjectLoader();
              // loader.load("https://s3-us-west-2.amazonaws.com/ryaperry-bucket/monkey.json", function( obj ){
              //   console.log("inside of obj json loader: ", obj);
              //   // scene.add( obj );
              // });

                // objLoader.setPath("https://s3-us-west-2.amazonaws.com/ryaperry-bucket/");
                // objLoader.load("https://s3-us-west-2.amazonaws.com/ryaperry-bucket/monkey2.json", object => {
                //     console.log("in object", object)
                //   }
                // )

                // dae.traverse(function(child){
                //   if (child.colladaId == "Suzanne"){
                //       // child.traverse(function(e){
                //       //     e.castShadow = true;
                //       //     e.receiveShadow = true;
                //           // if(e.material instanceof THREE.MeshPhongMaterial){
                //           //     e.material.needsUpdate = true;
                //           //     console.log("e.material in travers", e.material)
                //           // }
                //       // })
                //       scene.add(child);
                //   }

                //   else if ( child. colladaId == "Plane"){
                //       // child.traverse(function(e){
                //       //     e.castShadow = true;
                //       //     e.receiveShadow = true;
                //       // })
                //       console.
                //   }
                // })

                // dae.updateMatrix()
                // console.log("dae children of 2: ", dae.children[2])
                // var child = dae.children[2]
                // child.children[0].scale.set(30,30,30)
                // scene.add(child)
              // })



    // console.log("REFS ============", this.refs);
    // const composer = new EffectComposer(react3, camera)
    // console.log("Composer: ", composer);
    // composer.addPass(new EffectComposer.RenderPass(scene, camera))

    //     // Redraw with a shader
    // const effect = new EffectComposer.ShaderPass(THREE.DotScreenShader);
    // composer.addPass(effect);
    // console.log("Composer2: ", composer);

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

          <MyCube
            width={100}
            height={100}
            depth={100}
            color={0x654321}
            rotation={this.state.cubeRotation}
            position={this.state.cubePosition}
          />

          <GrassCube
            width={100}
            height={100}
            depth={100}
            map={"https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg"}
            position={new THREE.Vector3(-10,200,0)}
          />


          <HouseCube
            position={new THREE.Vector3(-150,0,-900)}
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
                <texture
                  url={'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg'}
                  crossOrigin="*"
                  wrapS={THREE.RepeatWrapping}
                  wrapT={THREE.RepeatWrapping}
                  repeat={this.groundRepeat}
                  anisotropy={16}
                />
              </meshPhongMaterial>
          </mesh>
        </scene>
      </React3>
    </div>);
  }
}
export default Transform;