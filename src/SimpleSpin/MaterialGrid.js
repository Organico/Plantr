import * as THREE from 'three';

import React, { Component, PropTypes } from 'react';
import MaterialCube from './MaterialCube';
import store from '../store';

console.log("Store in MaterialGrid.js", store.getState())
console.log("store {} ", {store})

const MaterialGrid = React.createClass({
    render() {
      // const {
      //   store
      // } = this.props
      const gardenGrid = store.getState().gardenReducer.gardenGrid
      console.log("here is the the this.props in MAterial Greid: ", gardenGrid)
      return (
        <group>
          {gardenGrid.map((materialCube, i) =>
            <MaterialCube key={i}
              width={100}
              height={100}
              depth={100}
              position={new THREE.Vector3(
                materialCube.x,
                0,
                materialCube.y
              )}
              map={"https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg"}
            />
          )}
        </group>
      )
    }
})

// const mapStateToProps = (state) => {
//   return {
//     gardenGrid: state.gardenReducer.gardenGrid
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // dispatchMovePiece (location) {
//     //   dispatch(movePiece(location))
//     // }
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MaterialGrid)
export default MaterialGrid







// class MaterialGrid extends React.Component {

//     constructor(props, context) {
//       super(props, context);
//     }

//     render() {
//       // const {
//       //   store
//       // } = this.props
//       // console.log("here is the the this.props in MAterial Greid: ", this.props)
//       console.log("this,asdfas", this)
//       // return (
//       //   <group>
//       //     {this.props.gardenGrid.map((materialCube, i) =>
//       //       <MaterialCube key={i}
//       //         width={100}
//       //         height={100}
//       //         depth={100}
//       //         position={new THREE.Vector3(
//       //           materialCube.x,
//       //           0,
//       //           materialCube.y
//       //         )}
//       //         map={"https://s3-us-west-2.amazonaws.com/ryaperry-bucket/grasslight-big.jpg"}
//       //       />
//       //     )}
//       //   </group>
//       // )
//       return(
//         <div>
//         <h2>THIS WORKS</h2>
//         </div>
//         )
//     }
// }

// // const mapStateToProps = (state) => {
// //   return {
// //     gardenGrid: state.gardenReducer.gardenGrid
// //   }
// // }

// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     // dispatchMovePiece (location) {
// //     //   dispatch(movePiece(location))
// //     // }
// //   }
// // };

// // export default connect(mapStateToProps, mapDispatchToProps)(MaterialGrid)

// export default(MaterialGrid)






