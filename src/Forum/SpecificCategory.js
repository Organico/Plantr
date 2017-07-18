import React,{ Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import Forum from './Forum.js'
import auth from '../client.js';
import { setCategory, toggleForumStatus} from '../Actions/ForumActions';




class SpecificCategory extends Component {
  constructor() {
    super();

    this.state = {
    };
  }


  render() {
    const profile = auth.getProfile();
    let that = this;
    let profilePic = {
      // height: '40px',
      // width: '20px',
      // backgroundImage: 'url(' + 'https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg' + ')',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      // zIndex: '900'
    }

    return (
        <div className="col-md-8 offset-md-2">
          <div className="post">
            <div className="row">
              <div className="col-md-8 offset-md-2" style={profilePic} >
                <h3>{this.props.categoryName}</h3>
              </div>
              <div className="replyEditDelete">
                <button type="submit" onClick={ () => {
                  this.props.dispatchSetCategory(this.props.categoryName);
                  this.props.dispatchToggleForumStatus(this.props.categoryName);

                  return <div> Testing <Forum/> </div>

                }
                }>See Posts!</button>
             </div>
           </div>
          </div>
        </div>




    )
  }
}

const mapStateToProps = (state) => {
  return {
    // messageToEdit: state.forumReducer.messageToEdit,
    // posts: state.forumReducer.posts,
    // editing: state.forumReducer.editing
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecificCategory);
