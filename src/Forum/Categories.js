import $ from 'jquery';
import { connect } from 'react-redux';
import Forum from './Forum.js'
import React,{ Component } from 'react';
import SpecificCategory from './SpecificCategory';
import { setCategory, toggleForumStatus } from '../Actions/ForumActions';

class Categories extends Component {
  renderForum() {
    return (
      <div>
        <div className="row welcome-forum-background">
          <div className="col-md-8 offset-md-2 ">
            <div className="">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <h1 className="forum-header">Welcome to the Forum!</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4 categories-list">
            <div className="row">
              <div className="col-md-9 offset-md-3">
                <h2 className="category-header">Categories:</h2>
                <hr />
              </div>
            </div>
            <SpecificCategory categoryName={'All'}/>
            <SpecificCategory categoryName={'General'}/>
            <SpecificCategory categoryName={'Gardening'}/>
            <SpecificCategory categoryName={'Compost Recipes'}/>
            <SpecificCategory categoryName={'Plant Tips'}/>
            <SpecificCategory categoryName={'Plantr Website Questions'}/>
          </div>
          <div className="col-md-8">
            <Forum />
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
    posts: state.forumReducer.posts
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
