import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import OBJLoader from 'three-obj-loader'
OBJLoader(THREE);
import MTLLoader from 'three-mtl-loader'


class HouseCube extends React.Component {
  // static propTypes = {
  //   width: React.PropTypes.number.isRequired,
  //   height: React.PropTypes.number.isRequired,
  //   color: React.PropTypes.string.isRequired,
  // };
  constructor(props, context) {
    super(props, context);

    this.loadThing = this.loadThing.bind(this);

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
            object.position.set(-150, 0, -900)

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
                // child.material.side = THREE.BackSide

              }
            });

            console.log("this is the object", object);
            console.log("before: this is the object that is binded to this", this);
            this.refs.houseGroup.add(object);
            console.log("after: this is the object that is binded to this", this);

        }, onProgress, onError);
    });
  }

  componentDidMount(){
    this.loadThing();
    console.log("logging this in the comoponentDidMount", this)
  }

  render() {
    return (
      <group ref="houseGroup" />
    );
  }
}
export default HouseCube;