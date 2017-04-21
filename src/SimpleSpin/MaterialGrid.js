import * as THREE from 'three';

import React, { Component, PropTypes } from 'react';
import MaterialCube from './MaterialCube';
import { connect } from 'react-redux';

import store from '../store';

console.log("Store in MaterialGrid.js", store.getState())
console.log("store {} ", {store})

class MaterialGrid extends React.Component {

    constructor(props, context) {
      super(props,context)
      this.gardenGrid = store.getState().gardenReducer.gardenGrid
    }


    render() {
      return (
        <group>
          {this.gardenGrid.map((materialCube, i) =>
            <MaterialCube key={i}
              width={100}
              height={20}
              depth={100}
              position={new THREE.Vector3(
                materialCube.x * 2 - 500,
                0,
                materialCube.y * 2 - 500
              )}
              map={materialCube.img}
            />
          )}
        </group>
      )
    }
}

export default(MaterialGrid)


// const MaterialGrid = React.createClass({
//     render() {
//       // const {
//       //   store
//       // } = this.props
//       const gardenGrid = store.getState().gardenReducer.gardenGrid
//       console.log("here is the the this.props in MAterial Greid: ", gardenGrid)
//       return (
//         <group>
//           {gardenGrid.map((materialCube, i) =>
//             <MaterialCube key={i}
//               width={100}
//               height={20}
//               depth={100}
//               position={new THREE.Vector3(
//                 materialCube.x * 2 - 500,
//                 0,
//                 materialCube.y * 2 - 500
//               )}
//               map={materialCube.img}
//             />
//           )}
//         </group>
//       )
//     }
// })

// export default MaterialGrid







