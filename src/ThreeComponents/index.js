import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import MyCube from './MyCube'
import Transform from './Transform'

class MyCubeView extends React.Component {

  constructor(props, context) {
    super(props, context);
    console.log("MYCUBEView HASE BEEN CREATED");
  }

  render() {
    return (<Transform width={800} height={800} color={"white"} />);
  }
}

export default MyCubeView;