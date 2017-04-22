

import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';


class CubeMapTest extends React.Component {
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

              var textureLoader = new THREE.TextureLoader();
              textureLoader.crossOrigin = '*'; // Use as needed


              var texture0 = textureLoader.load( 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0004.png' );
              var texture1 = textureLoader.load( 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0002.png' );
              var texture2 = textureLoader.load( 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0006.png' );
              var texture3 = textureLoader.load( 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0005.png' );
              var texture4 = textureLoader.load( 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0001.png' );
              var texture5 = textureLoader.load( 'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0003.png' );

              var materials = [
                  new THREE.MeshBasicMaterial( { map: texture0, side: THREE.BackSide } ),
                  new THREE.MeshBasicMaterial( { map: texture1, side: THREE.BackSide } ),
                  new THREE.MeshBasicMaterial( { map: texture2, side: THREE.BackSide } ),
                  new THREE.MeshBasicMaterial( { map: texture3, side: THREE.BackSide } ),
                  new THREE.MeshBasicMaterial( { map: texture4, side: THREE.BackSide } ),
                  new THREE.MeshBasicMaterial( { map: texture5, side: THREE.BackSide } )
              ];

              var faceMaterial = new THREE.MeshFaceMaterial( materials );
              var geometry = new THREE.BoxGeometry(
                this.props.width,
                this.props.depth,
                this.props.height
              );

              var boxMesh = new THREE.Mesh( geometry, faceMaterial );
              boxMesh.position.set(
                this.props.position.x,
                this.props.position.y,
                this.props.position.z
              )

            console.log("before: this is the object that is binded to this", this);
            console.log("Boxmesh: ===================== ", boxMesh);
            this.refs.cubemapGroup.add(boxMesh);
            console.log("after: this is the object that is binded to this", this);


  }

  componentDidMount(){
    this.loadThing();
    console.log("logging this in the comoponentDidMount", this)
  }

  render() {
    return (
      <group ref="cubemapGroup" />
    );
  }
}
export default CubeMapTest;