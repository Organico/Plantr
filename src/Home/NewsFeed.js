import React, { Component, PropTypes } from 'react';
import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux'
import axios from 'axios';

const NewsFeed = React.Component {
  render() {
    let pos = {
      marginLeft: '1000px'
    }

    let maxHeight = {
      height: '300px'
    }
    return(
        <div className="card col-xs-5" style={pos}>
            <div className="row">
              <img className="card-img" style={maxHeight} src='https://static.pexels.com/photos/296230/pexels-photo-296230.jpeg' alt="Card image" />
              <div className="card-img-overlay">
                <p className="card-text">I'm text that has a background image!</p>
              </div>
            </div>
            <div className="row">
              <img className="card-img" style={maxHeight} src='https://static.pexels.com/photos/169523/pexels-photo-169523.jpeg' alt="Card image" />
              <div className="card-img-overlay">
                <p className="card-text">I'm text that has a background image!</p>
              </div>
            </div>
            <div className="row">
              <img className="card-img" style={maxHeight} src='https://static.pexels.com/photos/136183/pexels-photo-136183.jpeg' alt="Card image" />
              <div className="card-img-overlay">
                <p className="card-text">I'm text that has a background image!</p>
            </div>
          </div>
        </div>

      )
    }
  }

export default NewsFeed;