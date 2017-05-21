import aframe from 'aframe'
import 'aframe-particle-system-component';
import 'aframe-mountain-component';
import 'aframe-cubemap-component';
import 'aframe-gridhelper-component'
import 'aframe-mouse-cursor-component'
import 'aframe-event-set-component'
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import registerClickDrag from 'aframe-click-drag-component';
registerClickDrag(aframe);
import store from '../store';
import './SnapToGrid'
import './CursorListener'


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

          <a-entity
            camera
            position="0 200 400"
            wasd-controls="acceleration: 1000"
            look-controls-enabled="true"
            mouse-cursor>
            <a-camera>
              <a-cursor
                fuse="true"
                color="yellow"
                raycaster="objects: .materialCube"
              ></a-cursor>
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
              event-set__enter="_event: mouseenter; scale: 70 70 70"
              event-set__leave="_event: mouseleave; scale: 50 50 50"

            />
          )}

          {this.gardenGrid.map((materialCube, i) =>
            <Entity
              key={i}
              class="materialCube"
              geometry={{primitive: 'box', width: 100, height:30, depth:100}}
              material={{src: materialCube.img}}
              scale={{x: 1, y: 1, z: 1}}
              position={{x: materialCube.x * 2 - 475, y: 0, z: materialCube.y * 2 - 475}}
              click-drag
            />
          )}

          <a-entity position="0 500 0" cubemap="folder: https://s3-us-west-2.amazonaws.com/ryaperry-bucket/homeCubeMapAframeBlue3/; edgeLength: 1000"></a-entity>

        </a-scene >
    </div>
    );
  }
}

export default VRScene