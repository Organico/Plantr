import { connect } from 'react-redux';
import Forum from './Forum.js'
import React,{ Component } from 'react';
import SpecificCategory from './SpecificCategory'
import { toggleForumStatus } from '../Actions/ForumActions'

class Categories extends Component {
  renderCategory() {
    if (this.props.forumActive) {
      return (
        <div>
          <Forum/>
          <button onClick ={ ()=> {
            this.props.dispatchToggleForumStatus();
          }}>Return to Categories</button>
        </div>
      )
    }
  }

  renderForum() {
    return (
      <div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="post">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <h3>Welcome to the Forum!</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div className="searchForum">
          <input className="searchForumInput" />
        </div>
        <h2> Categories </h2>
        <div className="row">
          <div className="col-md-4">
            <SpecificCategory categoryName={'General'}/>
            <SpecificCategory categoryName={'Gardening'}/>
            <SpecificCategory categoryName={'Compost Recipes'}/>
            <SpecificCategory categoryName={'Plant Tips'}/>
            <SpecificCategory categoryName={'Plantr Website Questions'}/>
          </div>
          <div className="col-md-8">
            { this.renderCategory() }
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>{ this.renderForum() }</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    forumActive: state.forumReducer.forumActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchToggleForumStatus() {
      dispatch(toggleForumStatus());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
