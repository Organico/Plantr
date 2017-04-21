// import React from 'react';
// import React3 from 'react-three-renderer';
// import * as THREE from 'three';

// import TrackballControls from '../trackball';
// import MouseInput from '../inputs/MouseInput';


// class GrassCube extends React.Component {
//   static propTypes = {
//     width: React.PropTypes.number.isRequired,
//     height: React.PropTypes.number.isRequired,
//     depth: React.PropTypes.number.isRequired,
//   };
//   constructor(props, context) {
//     super(props, context);

//     // this.state = {
//         //position and rotation
//     // };

//   }


//   _onAnimate = () => {

//   };

//   componentDidMount(){
//     var grassLoader = new THREE.TextureLoader();
//     grassLoader.crossOrigin = '*'; // Use as needed
//     var grassTexture = grassLoader.load(this.props.map);
//     THREE.ImageUtils.crossOrigin = '';

//     this.refs.grassCubeMaterial.map = grassTexture;
//   }


//   render() {
//     return (
//           <mesh
//             position={this.props.position}
//             castShadow
//             receiveShadow
//           >
//               <boxGeometry
//                 width={this.props.width}
//                 height={this.props.height}
//                 depth={this.props.depth}
//               />
//               <meshBasicMaterial ref="grassCubeMaterial"
//               />

//           </mesh>
//          );
//   }
// }
// export default GrassCube;