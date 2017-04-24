import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';
import { connect } from 'react-redux'
import Plant from './Plant'
import MyRect from './MyRectangle'

// import { togglePlant} from '../action'

class PlantShelf extends React.Component {
     constructor(...args) {
      super(...args);

    }

    render() {
        console.log("The plant shelf is", this.props.plantShelf);
        return (
          <Group>
            <MyRect />
            {this.props.plantShelf.map((plantShelfPlant, i) =>
              <Plant
                key={i}
                x={plantShelfPlant.x}
                y={plantShelfPlant.y}
                img={plantShelfPlant.img}
                model={plantShelfPlant.model}
                isDraggable={plantShelfPlant.isDraggable}
                plant={plantShelfPlant}

              />
            )}
          </Group>
        );
    }
};

const mapStateToProps = (state) => {
  return {
    plantShelf: state.gardenReducer.plantShelf,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlantShelf)
// export default PlantShelf;