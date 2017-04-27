import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PlantBreakdown from './PlantBreakdown'
import Calendar from './Calendar'
import { connect } from 'react-redux'


class AnalyticsTabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    var divStyle = {
      margin: "40px",
      padding: "20px"
    };
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>
              Plant Breakdown
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}>
              Analytics
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '' })}
              onClick={() => { this.toggle('3'); }}>
              Harvest Chart
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <br></br>
            <Calendar stle={divStyle}/>
          </TabPane>
          <TabPane tabId="2">
                <Card block style={divStyle}>
                  <CardTitle>Stats</CardTitle>
                  <CardText>Square Footage: </CardText>
                  <CardText>Hardiness Zone: </CardText>
                  <CardText>Estimated Plant Cost: </CardText>
                       { (function() {
                    if (true) {
                      return <CardText>Warning: You have plants out of your Hardiness zone</CardText>
                    }
                  }())
                  }
                      { (function() {
                    if (true) {
                      return <CardText>Warning: You have plants on non-viable surfaces</CardText>
                    }
                  }())
                  }
                </Card>
          </TabPane>
          <TabPane tabId="3">
                <Card block style={divStyle}>
              <table className="MyClassName">
           <thead className="hideMe">
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Days 'til Harvest</th>
                  <th>Harvest Date</th>
                </tr>
              </thead>
              <tbody>
              {this.props.harvestTable.map(function(schedule, i) {
                    return (
                      <tr>
                          <td>{schedule.name}</td>
                          <td>{12}</td>
                          <td>{schedule.harvest}</td>
                          <td>{schedule.harvestDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
                </Card>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    harvestTable: state.gardenReducer.harvestTable
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsTabs)
