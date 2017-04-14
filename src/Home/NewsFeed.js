import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

// const NewsFeed = (props) => {

class NewsFeed extends React.Component {

  render(){
  let pos = {
    marginTop: '10px',
    marginRight: '50px'
  }

  let maxHeight = {
    height: '275px',
    borderRadius: '10px'
    // borderWidth: '10px',
    // borderStyle: 'hidden'
  }

  let text = {
    marginTop: '-65%',
    marginLeft: '15%',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
  }

    return (
      <div className="container-fluid">
        <div className="row justify-content-md-end">
          <div className="card col-xs-12 col-md-3" style={pos}>
              <div className="row">

                <img className="card-img" style={maxHeight} src='https://static.pexels.com/photos/296230/pexels-photo-296230.jpeg' alt="Card image" />
                <p style={text}>I'm text that has a background image!</p>
              </div>
              <br />
              <div className="row">
                <img className="card-img" style={maxHeight} src='https://static.pexels.com/photos/169523/pexels-photo-169523.jpeg' alt="Card image" />
                <p style={text}>I'm text that has a background image!</p>
              </div>
              <br />
              <div className="row">
                <img className="card-img" style={maxHeight} src='https://static.pexels.com/photos/136183/pexels-photo-136183.jpeg' alt="Card image" />
                <p style={text}>I'm text that has a background image!</p>
            </div>
            <br />
          </div>
        </div>
      </div>
      )
    }
  }
// DIV TO BE INSERTED ON LINE 35 WITH REAL MATERIAL
// <div style={state.forum.PostImage} > {state.forum.text} </div>
export default NewsFeed;