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
    return(
      <div className="container">
        {/*map posts to forum*/}
        <ForumPost />
        <div className="row">
          <CreateNewPost />
        </div>
      </div>
    )
  }
})


export default Forum;