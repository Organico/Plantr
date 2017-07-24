import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { setCategory, toggleForumStatus} from '../Actions/ForumActions';

class SpecificCategory extends Component {
  render() {
    return (
      <div className="col-md-8 offset-md-2">
        <div className="post">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h3>{this.props.categoryName}</h3>
            </div>
            <div className="replyEditDelete">
              <button type="submit" onClick={ () => {
                this.props.dispatchSetCategory(this.props.categoryName);
                this.props.dispatchToggleForumStatus(this.props.categoryName);
              }}>See Posts!</button>
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
    },
    dispatchToggleForumStatus() {
      dispatch(toggleForumStatus());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecificCategory);
