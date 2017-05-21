import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import OBJLoader from 'three-obj-loader'
OBJLoader(THREE);
import MTLLoader from 'three-mtl-loader'
import ColladaLoader from 'three-collada-loader';
import store from '../store';



class NewPlantModel extends React.Component {
  // static propTypes = {
  //   width: React.PropTypes.number.isRequired,
  //   height: React.PropTypes.number.isRequired,
  //   color: React.PropTypes.string.isRequired,
  // };
  constructor(props, context) {
    super(props, context);

    this.loadThing = this.loadThing.bind(this);
    this.colladaCache = store.getState().gardenReducer.colladaCache;


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

    console.log("Logging props of this specific NewPlantModel: ", this.props)

    var colladaLoader = new ColladaLoader()
    colladaLoader.options.convertUpAxis = true;
    var item = colladaLoader.load(FILE, function(collada){
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
      this.cache[FILE] = item;
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