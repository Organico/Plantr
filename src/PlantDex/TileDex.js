import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import TileSquare from './TileSquare.js'


// import { togglePlant} from '../action'

class TileDex extends React.Component {
     constructor(...args) {
      super(...args);

      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      console.log("click!")
    }
    handleMouseOver(){
      document.body.style.cursor = 'pointer';
    }
    handleMouseOut(){
      document.body.style.cursor = 'default';
    }
    render() {
        console.log("The fruit dex", this.props.fruitDex);
        return (
          <Stage width={600} height={300} fill="white" >
          <Layer>
          <Group>
            {this.props.tileDex.map((tile, i) =>
              <TileSquare
                key={i}
                x={tile.x}
                y={tile.y}
                img={tile.img}
                name={tile.name}
                viability={tile.viability}
                stroke={tile.stroke}
              />
            )}
          </Group>
            </Layer>
          </Stage>
        );
    }
};

const mapStateToProps = (state) => {
  return {
    tileDex: state.gardenReducer.tileDex,
    plants: state.gardenReducer.plants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddPlantToPlantGrid (plant) {
      dispatch(addPlantToPlantGrid(plant))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TileDex)
// export default PlantShelf;