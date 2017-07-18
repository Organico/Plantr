import React,{ Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import Forum from './Forum.js'


class Categories extends Component {
  constructor() {
    super();

    this.state = {
    };
  }


  render() {
    const profile = auth.getProfile();
    let that = this;
    return (
      <div className="row">

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // messageToEdit: state.forumReducer.messageToEdit,
    // posts: state.forumReducer.posts,
    // currentPost: state.forumReducer.currentPost,
    // editing: state.forumReducer.editing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    // dispatchSetPost(message) {
    //   dispatch(setPosts(message));
    // },
    // dispatchSetEditing(editing) {
    //   dispatch(setEditing(editing));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
