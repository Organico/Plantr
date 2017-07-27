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
        <div className="search-forum">
          <input
            className="search-forum-input"
            onChange={this.onInputChange}
            ref="searchPosts"
            placeholder="search forum posts"
          />
        </div>
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
