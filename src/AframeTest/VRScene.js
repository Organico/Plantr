import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-mountain-component';
import 'aframe-cubemap-component';
import 'aframe-gridhelper-component'
import 'aframe-mouse-cursor-component'
import 'aframe-event-set-component'


import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import aframe from 'aframe'
// import registerClickDrag from 'aframe-click-drag-component';
// registerClickDrag(aframe);
import store from '../store';


class VRScene extends React.Component {

  constructor(props, context) {
    super(props,context)
    this.plantGrid = store.getState().gardenReducer.plantGrid
    this.gardenGrid = store.getState().gardenReducer.gardenGrid
  }

  handleClick = () => {
    console.log('Clicked!');
  }

  handleCollide = () => {
    console.log('Collided!');
  }


  render () {
    var cat = 10
    return (
      <div id="embed-aframe">
        <a-scene embedded>
          <a-sphere
            position="0 1.25 -5"
            radius="100"
            color="#EF2D5E"
            event-set__enter="_event: mouseenter; material.color: yellowgreen; scale: 3 1 1"
            event-set__leave="_event: mouseleave; material.color: skyblue; scale: 1 1 1"
          >
          </a-sphere>

          <a-entity
            camera
            position="0 200 400"
            wasd-controls="acceleration: 1000"
            look-controls-enabled="true"
            mouse-cursor>
            <a-camera>
              <a-cursor fuse="true" color="yellow"></a-cursor>
            </a-camera>
          </a-entity>


          {this.plantGrid.map((newPlantModel, i) =>
            <Entity
              id="colladaPlant"
              key={i}
              primitive="a-collada-model"
              src={newPlantModel.model}
              position={"" + (newPlantModel.x * 2 - 500) + " " + 0 + " " + (newPlantModel.y * 2-500)}
              scale="50 50 50"
              click-drag
            />
          )}

          {this.gardenGrid.map((materialCube, i) =>
            <Entity
              geometry={{primitive: 'box', width: 100, height:30, depth:100}}
              material={{src: materialCube.img}}
              scale={{x: 1, y: 1, z: 1}}
              position={{x: materialCube.x * 2 - 500, y: 0, z: materialCube.y * 2 - 500}}
              click-drag
            />
          )}
          <a-entity id="rain" particle-system="preset: snow; color: #24CAFF; particleCount: 10000"></a-entity>
          <a-assets>
            <img id="advertisement" src="https://s3-us-west-2.amazonaws.com/ryaperry-bucket/homeCubeMapNegZ33-NegZ2.6-Y5.7/environment.jpg" crossOrigin="anonymous" />
          </a-assets>
          <a-entity position="0 500 0" particle-system="preset: snow" positionSpread="1000 1000 1000" size="10"></a-entity>

          <a-entity position="0 500 0" cubemap="folder: https://s3-us-west-2.amazonaws.com/ryaperry-bucket/homeCubeMapAframeBlue/; edgeLength: 1000"></a-entity>

          <a-plane src="#advertisement"></a-plane>
        </a-scene >
    </div>
    );
  }
}

export default VRScene

// <a-entity position="0 500 0" cubemap="folder: https://s3-us-west-2.amazonaws.com/ryaperry-bucket/homeCubeMapAframe/; edgeLength: 1000"></a-entity>
// ReactDOM.render(<VRScene/>, document.querySelector('#sceneContainer'));