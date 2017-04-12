import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import MyCube from './MyCube'

class MyCubeView extends React.Component {

  constructor(props, context) {
    super(props, context);
    console.log("MYCUBEView HASE BEEN CREATED");
  }

  render() {
    return (<MyCube width={500} height={500} color={"green"} />);
  }
}

export default MyCubeView;