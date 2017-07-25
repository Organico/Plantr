import $ from 'jquery';
import { connect } from 'react-redux';
import Forum from './Forum.js'
import React,{ Component } from 'react';
import SpecificCategory from './SpecificCategory'
import { setCategory, toggleForumStatus } from '../Actions/ForumActions'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchTerm: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const search = this.refs.searchPosts.value
    // $('html, body').animate({ scrollTop: 0 }, 'fast');
    let newlyDisplayed = this.props.posts.filter((post) => {
      let { message, nickname, category, title } = post;
      if (message.includes(search) || nickname.includes(search) || category.includes(search) || title.includes(search)) {
        // display through search
        this.props.dispatchSetCategory(category);
      }
    })
    // this.setState({
    //   searchTerm: search,
    //   posts: newlyDisplayed
    // })
  }

  componentDidMount() {
    this.props.dispatchSetCategory('General');
    this.props.dispatchToggleForumStatus('General');
  }

  renderCategory() {
    if (this.props.forumActive) {
      return <Forum/>
    }
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
