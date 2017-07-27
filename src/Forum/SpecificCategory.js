import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { setCategory } from '../Actions/ForumActions';

class SpecificCategory extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-9 offset-md-3">
          <h3 className="category" onClick={ () => {
            this.props.dispatchSetCategory(this.props.categoryName);
          }}>{this.props.categoryName} //</h3>
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
