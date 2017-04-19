import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import PlantDexPlant from './PlantDexPlant'


// import { togglePlant} from '../action'

class VegiDex extends React.Component {
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
            {this.props.vegiDex.map((vegi, i) =>
              <PlantDexPlant
                key={i}
                x={vegi.x}
                y={vegi.y}
                img={vegi.img}
                isDraggable={vegi.isDraggable}
                plant={vegi}

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
    vegiDex: state.gardenReducer.vegiDex,
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

export default connect(mapStateToProps, mapDispatchToProps)(VegiDex)
// export default PlantShelf;