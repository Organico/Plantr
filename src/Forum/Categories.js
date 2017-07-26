import $ from 'jquery';
import { connect } from 'react-redux';
import Forum from './Forum.js'
import React,{ Component } from 'react';
import SpecificCategory from './SpecificCategory';
import { setCategory, toggleForumStatus } from '../Actions/ForumActions';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedPosts: []
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    let newDisplayedPosts = [];
    const search = this.refs.searchPosts.value
    this.props.posts.forEach((post) => {
      let { message, nickname, title } = post;
      if (message.includes(search)) {
        newDisplayedPosts.push(message);
      } else if (nickname.includes(search)) {
        newDisplayedPosts.push(nickname);
      } else if (title.includes(search)) {
        newDisplayedPosts.push(title);
      }
      this.setState({ displayedPosts: newDisplayedPosts })
    });
  }

  renderCategory() {
    const result = this.state.displayedPosts
    return <Forum result={result} />
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
          <input
            className="searchForumInput"
            onChange={this.onInputChange}
            ref="searchPosts"
          />
        </div>
        <div className="row">
          <div className="col-md-4">
            <SpecificCategory categoryName={'All'}/>
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
