import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import OBJLoader from 'three-obj-loader'
OBJLoader(THREE);
import MTLLoader from 'three-mtl-loader'
import ColladaLoader from 'three-collada-loader';


class NewPlantModel extends React.Component {
  // static propTypes = {
  //   width: React.PropTypes.number.isRequired,
  //   height: React.PropTypes.number.isRequired,
  //   color: React.PropTypes.string.isRequired,
  // };
  constructor(props, context) {
    super(props, context);

    this.loadThing = this.loadThing.bind(this);

  }

  createArrayOfMeshes(){
    var arrayOfMeshes = [];
      for(var i = 0; i < 7; i++){
      var currentMesh = dae.children[i]
      console.log("dae : ", dae)
      console.log("current mesh: ", i)
      console.log("current mesh: ", currentMesh)
      currentMesh.scale.set(50,50,50);
      arrayOfMeshes.push(currentMesh);
    }
    return arrayOfMeshes;
  }

  loadThing(){
    const FILE = this.props.daeFile;

    const {
      newPlantModelGroup
    } = this.refs;

    const {
      position
    } = this.props

    var colladaLoader = new ColladaLoader()
    colladaLoader.options.convertUpAxis = true;
    colladaLoader.load(FILE, function(collada){
      console.log("collada Loader loded successfully !!!!!", collada)
      var dae = collada.scene;

      var arrayOfMeshes = [];
      for(var i = 0; i < 7; i++){
        var currentMesh = dae.children[i]
        console.log("dae : ", dae)
        console.log("current mesh: ", i)
        console.log("current mesh: ", currentMesh)
        currentMesh.scale.set(50,50,50);
        currentMesh.position.set(
          position.x,
          position.y,
          position.z
        )
        arrayOfMeshes.push(currentMesh);
      }

      for (var i = 0; i < arrayOfMeshes.length; i++){
        newPlantModelGroup.add(arrayOfMeshes[i])
      }

      // var onProgress = function ( xhr ) {
      //   if ( xhr.lengthComputable ) {
      //     var percentComplete = xhr.loaded / xhr.total * 100;
      //     console.log( Math.round(percentComplete, 2) + '% downloaded' );
      //   }
      // };
      // var onError = function ( xhr ) {
      //   console.log("error", xhr)
      // };

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



      //TODO: THIS SHOULD BE A FOR A LOOP
      //Add position here....

    })



  }

  componentDidMount(){
    this.loadThing();
    console.log("logging this in the comoponentDidMount", this)
  }

  render() {
    return (
      <group ref="newPlantModelGroup" />
    );
  }
}
export default NewPlantModel;