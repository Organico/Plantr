import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import PlantDexPlant from './PlantDexPlant'

// import { togglePlant} from '../action'

class FruitDex extends React.Component {
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
            {this.props.fruitDex.map((fruit, i) =>
              <PlantDexPlant
                key={i}
                x={fruit.x}
                y={fruit.y}
                img={fruit.img}
                isDraggable={fruit.isDraggable}
                plant={fruit}
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
    fruitDex: state.gardenReducer.fruitDex,
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

export default connect(mapStateToProps, mapDispatchToProps)(FruitDex)
// export default PlantShelf;