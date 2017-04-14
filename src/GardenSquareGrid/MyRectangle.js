import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Stage, Group} from 'react-konva';
// import AuthService from '../config/AuthService.js'

// const auth = new AuthService('vBOwXk8xIgy3kroSs5vz1TFfrYyFQNFf', 'skebaish1992.auth0.com');

// console.log(auth);

class MyRect extends React.Component {
    constructor(...args) {
      super(...args);
      this.handleClick = this.handleClick.bind(this);


    }
    handleClick() {
      // this.setState({
      //   color: Konva.Util.getRandomColor()
      // });
    }
    render() {
        return (
            <Rect
                x={150} y={430} width={400} height={20}
                fill={"brown"}
                shadowBlur={10}
                onClick={this.handleClick}
            />
        );
    }
}

export default MyRect;