import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import Stats from 'stats.js';

import OBJLoader from 'three-obj-loader'
OBJLoader(THREE);
import MTLLoader from 'three-mtl-loader'
// MTLLoader(THREE)


// import CustomObject from './CustomObject'
// console.log("custom object")

class CustomObject extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.object;
    this.loadThing = this.loadThing.bind(this);
  }

  loadThing(){
    const PATH = "https://s3-us-west-2.amazonaws.com/ryaperry-bucket/"
    const MTL_FILE = "demo.mtl"
    const OBJ_FILE = "demo.obj"

    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };
    var onError = function ( xhr ) {
      console.log("error", xhr)
    };


    const mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl(PATH);
    mtlLoader.setPath(PATH); // One of these might not be needed
    mtlLoader.crossOrigin = '*'; // Use as needed
    mtlLoader.load(MTL_FILE, materials => {
        console.log("in materieassls", materials)
        materials.preload();
        // OBJ Loader
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(PATH);
        objLoader.load(OBJ_FILE, object => {
            console.log("in object", object)

            for(let child of object.children) {
                child.material.side = THREE.DoubleSide
            }
                    // Simple example to load the file
            // const YourComponent = React.CreateElement(
            //     <Something
            //         loadedObject={object}
            //     />
            //     )
            // );
            this.object = object;
            console.log("this is the object", object);
            console.log("this is the object that is binded to this", this);

                    // this comes from import {render} from 'react-dom'
            // render(YourComponent, document.getElementById('your-container'));
        }, onProgress, onError);
    });
  }

  componentDidMount(){

    // this.refs.group.add(this.props.loadedObject);

  }


  render() {

    return ( <group ref="customGroup" />);
  }
}
export default CustomObject;