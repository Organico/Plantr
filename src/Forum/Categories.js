import React,{ Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import auth from '../client.js';
import SpecificCategory from './SpecificCategory'
import Forum from './Forum.js'
import {toggleForumStatus} from '../Actions/ForumActions'




class Categories extends Component {
  constructor() {
    super();

    this.state = {
    };
  }


  render() {
    const profile = auth.getProfile();
    let that = this;

      if(this.props.forumActive){
        return (<div>
          <Forum/>
          <button onClick ={ ()=> {
            this.props.dispatchToggleForumStatus();
          }
        }
            >Return to Categories</button>
            </div>
        )
      } else {
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
        <h2> Categories </h2>
        <SpecificCategory categoryName={'Gardening'}/>
        <SpecificCategory categoryName={'Compost Recipes'}/>
        <SpecificCategory categoryName={'Plant Tips'}/>
        <SpecificCategory categoryName={'Plantr Website Questions'}/>


        </div>
        )
      }

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
