import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import ForumPost from './ForumPost';
import CreateNewPost from './CreateNewPost';
import axios from 'axios';
import { setPosts } from '../Actions/ForumActions';

// import axios from 'axios';
// import { setUserParameters } from '../action';
// import GardenGrid from './GardenSquareGrid/GardenGrid';

const Forum = React.createClass({

   getPost() {
    axios.get('/api/forum')
    .then((res) => {
      var dbPostData = res.data;
      this.props.dispatchSetPost(dbPostData)
      console.log("setPostCalled ", res);
    }).catch((err) => {
      console.error(err);
      console.log("Error in Forum()");
    });
  },

  render() {
    console.log('this.props', this.props)
    return(
        <div className="row">
          <button type="submit" onClick={ () => {
            this.getPost();
          }} >Get Request Here</button>
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

    dispatchSetPost(message) {
      dispatch(setPosts(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forum);