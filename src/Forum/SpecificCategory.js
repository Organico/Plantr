import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { setCategory } from '../Actions/ForumActions';

class SpecificCategory extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="post">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h3 onClick={ () => {
                  this.props.dispatchSetCategory(this.props.categoryName);
                }}>{this.props.categoryName}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetCategory(category) {
      dispatch(setCategory(category));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecificCategory);
