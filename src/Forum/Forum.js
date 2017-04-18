import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import ForumPost from './ForumPost';
import CreateNewPost from './CreateNewPost';

// import axios from 'axios';
// import { setUserParameters } from '../action';
// import GardenGrid from './GardenSquareGrid/GardenGrid';

const Forum = React.createClass({

  render() {
    console.log("forumJS", this.props.post);
    return(


        <div className="row">
          <div className="col-md-6">
            <CreateNewPost />
          </div>
          <div className="col-md-6">
            {this.props.posts.map((post, i) =>
              <ForumPost key={i} title={post.title.split(" ").slice(0, 20).join(" ")
            } message={post.message.split(" ").slice(0, 100).join(" ") + "..."}/>
            )}
          </div>
        </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchAddPost(message) {
      dispatch(addPost(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forum);