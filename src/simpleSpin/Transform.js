import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Stats from 'stats.js';

import OBJLoader from 'three-obj-loader'
OBJLoader(THREE);
import MTLLoader from 'three-mtl-loader'
// MTLLoader(THREE)
// import CustomObject from './CustomObject'

// import ParsedModel from './parsed_model';
// import createMaterial from './create_material';



class Transform extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.cameraPosition = new THREE.Vector3(550, 500, 1000);
    this.lookAt = new THREE.Vector3(0, 200, 0)
    this.lightPosition = new THREE.Vector3(1, 1, 1)
    THREE.ImageUtils.crossOrigin = ''; //moved from render()
    this.object;

    this._onAnimate = () => {
    };
    this.loadThing = this.loadThing.bind(this);
    this.loadedObject;


    this.groundPosition = new THREE.Vector3(0, -25, 0);
    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0);
    this.groundRepeat = new THREE.Vector2(25, 25);

  }

  loadThing(){
    const PATH = "https://s3-us-west-2.amazonaws.com/ryaperry-bucket/"
    const MTL_FILE = "demo.mtl"
    const OBJ_FILE = "demo.obj"

    // const MTL_FILE = "VG14_7.mtl"
    // const OBJ_FILE = "VG14_7.obj"

    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };
    var onError = function ( xhr ) {
      console.log("error", xhr)
    };

    var texture = new THREE.Texture();

    const mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl(PATH);
    mtlLoader.setPath(PATH); // One of these might not be needed
    mtlLoader.crossOrigin = '*'; // Use as needed
    mtlLoader.load(MTL_FILE, materials => {
        console.log("in materieassls", materials)
        materials.preload();
        // OBJ Loader
        console.log("materials after preload: " , materials)
        const objLoader = new THREE.OBJLoader();
        console.log("Objloader before setting materials: ", objLoader)
        // objLoader.setMaterials(materials);
        console.log("Objloader after setting materials: ", objLoader)
        objLoader.setPath(PATH);
        objLoader.load(OBJ_FILE, object => {
            console.log("in object", object)
            object.scale.set(500, 500, 500);
            object.position.set(-100, 0, -700)

            // for(let child of object.children) {
            //     console.log("looking at the children of object", child);
            //     // child.material.side = THREE.DoubleSide
            // }

            object.traverse( function ( child ) {
              console.log("traversing children ", child)
              if ( child instanceof THREE.Mesh ) {
                console.log("child thats a mesh! ", child)
                var loader = new THREE.TextureLoader();
                loader.crossOrigin = '*'; // Use as needed
                var imgTexture = loader.load('https://s3-us-west-2.amazonaws.com/ryaperry-bucket/firstUVLayoutHouse.png');
                child.material.map = imgTexture
                // child.material.map = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/ryaperry-bucket/firstUVLayout.png');
              }
            });


            this.loadedObject = object;
            console.log("this is the object", object);
            console.log("before: this is the object that is binded to this", this);
            this.refs.group.add(object);
            console.log("after: this is the object that is binded to this", this);

                    // this comes from import {render} from 'react-dom'
            // render(YourComponent, document.getElementById('your-container'));
        }, onProgress, onError);
    });

  }

  componentDidMount(){
    this.loadThing();
    console.log("logging this in the comoponentDidMount", this)
    console.log("logging the refs in the comoponentDidMount", this.refs)
    console.log("logging the props in the comoponentDidMount", this.props)
    console.log("logging the loadedObject in the comoponentDidMount", this.loadedObject)
    // this.refs.group.add(this.loadedObject);
    // this.stats = new Stats();

    // const {
    //   scene
    // } = this.refs;
    // console.log("ref scenein comoponent did mount", scene);
    // console.log("ref scene", this.refs);
    // var cat


    // var onProgress = function ( xhr ) {
    //   if ( xhr.lengthComputable ) {
    //     var percentComplete = xhr.loaded / xhr.total * 100;
    //     console.log( Math.round(percentComplete, 2) + '% downloaded' );
    //   }
    // };
    // var onError = function ( xhr ) {
    //   console.log("error", xhr)
    // };
    // console.log("on progress mounted")

    // var manager = new THREE.LoadingManager();
    // manager.onProgress = function ( item, loaded, total ) {
    //    console.log( item, loaded, total );
    // };
    // console.log("manager mounted")

    // var texture = new THREE.Texture();
    // var loader = new THREE.ImageLoader( manager );
    // loader.load( 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/demo.mtl', function ( image ) {

    //   texture.image = image;
    //   texture.needsUpdate = true;

    // } );

    // var loader = new THREE.OBJLoader( manager );
    // loader.load( 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/demo.obj', function ( object ) {

    //   object.traverse( function ( child ) {
    //     if ( child instanceof THREE.Mesh ) {
    //       child.material.map = texture;
    //     }
    //   });

    //   object.position.y = - 95;
    //   console.log("THIS IS YOUR OBJECT HOMIE (insides)", object)
    //   console.log("THIS IS YOUR OBJECT HOMIE (whats the scene tho)", scene)
    //   scene.add(object);
    //   console.log("THIS IS YOUR OBJECT HOMIE (whats the scene after tho)", scene)
    //   cat = object;

    // }, onProgress, onError );

    // var matLoader = new MTLLoader();
    // matLoader.load('https://s3-us-west-2.amazonaws.com/ryaperry-bucket/demo.mtl', function(materials){
    //   materials.preload();
    //   console.log("im in the mat loader", materials)

    //   var objLoader = new THREE.OBJLoader();
    //   objLoader.setMaterials(materials);
    //   objLoader.load('https://s3-us-west-2.amazonaws.com/ryaperry-bucket/demo.obj', function(obj){
    //     console.log("im in the obj loader", obj);

    //     scene.add(obj);
    //   })
    // });

  }

  render() {
    const {
      width,
      height,
    } = this.props;

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera below
      width={width}
      height={height}
      onAnimate={this._onAnimate}

      shadowMapEnabled
      shadowMapType={THREE.PCFShadowMap}
      clearColor={0x7EC0EE}

      ref="react3"
    >
      <scene ref="scene">
        <perspectiveCamera
          name="camera"
          fov={70}
          aspect={width / height}
          near={1}
          far={3000}
          position={this.cameraPosition}
          lookAt={this.lookAt}
        />
        <cameraHelper name="cameraHelper"
          fov={70}
          aspect={width / height}
          near={1}
          far={3000}
          position={this.cameraPosition}
          lookAt={this.lookAt}/>
            <ambientLight
                color={new THREE.Color("white")}
            />
        <gridHelper size={1000} divisions={10} />
        <directionalLight color={0xffffff} intensity={5} position={new THREE.Vector3(1, 1, 1)} />
         <mesh
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={new THREE.Color( this.props.color )}
            map= {THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg')}
          />
        </mesh>
        <group ref="group" />

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
                        wrapS={THREE.RepeatWrapping}
                        wrapT={THREE.RepeatWrapping}
                        repeat={this.groundRepeat}
                        anisotropy={16}
                      />
                    </meshPhongMaterial>
                  </mesh>

      </scene>
    </React3>);
  }
}
export default Transform;