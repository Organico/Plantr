

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

                // var loader = new THREE.TextureLoader();

                // var texture1 = loader.load('texture1.jpg');
                // var texture2 = loader.load('texture2.jpg');

                // var urls = [
                //   'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0004.png',
                //   'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0002.png',
                //   'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0006.png',
                //   'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0005.png',
                //   'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0001.png',
                //   'https://s3-us-west-2.amazonaws.com/ryaperry-bucket/cubeMapTest/0003.png'
                // ]

                // // wrap it up into the object that we need
                // var cubemap = THREE.ImageUtils.loadTextureCube(urls);
                // // set the format, likely RGB unless you've gone crazy
                // cubemap.format = THREE.RGBFormat;

                // var material = new THREE.MeshLambertMaterial({
                //   color: 0xffffff,
                //   envMap: cubemap
                // });


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

              var geometry = new THREE.BoxGeometry( 1000, 1000, 1000 );
              var boxMesh = new THREE.Mesh( geometry, faceMaterial );

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