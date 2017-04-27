import React from 'react'
import BigCalendar from 'react-big-calendar'
import { connect } from 'react-redux'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);


// console.log(this.props.project);

class Calendar extends React.Component {
  constructor(props){
        super(props);
        this.state = {project: props.project, deliverables: {
          dates:[{
            'title': "Jesse's Birthday",
            'start': new Date(2017, 2, 31),
            'end': new Date(2017, 2, 31)
          }]
        }
    }
  }


  render(){
    return (
      <BigCalendar
        events={this.state.deliverables.dates}
        eventPropGetter={(this.eventStyleGetter)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    plantGrid: state.gardenReducer.plantGrid,
    plantGrowthGraph: state.gardenReducer.plantGrowthGraph
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
