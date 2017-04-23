import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
// import AuthService from '../config/AuthService.js'

// const auth = new AuthService('vBOwXk8xIgy3kroSs5vz1TFfrYyFQNFf', 'skebaish1992.auth0.com');

// console.log(auth);

class MyRect extends React.Component {
    constructor(...args) {
      super(...args);


    }

    render() {
        return (
            <Rect
                x={20} y={630} width={450} height={20}
                fill={"brown"}
                shadowBlur={10}
                onClick={this.handleClick}
            />
        );
    }
}

export default MyRect;