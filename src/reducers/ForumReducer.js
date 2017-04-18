const initialForumState = {
     // // subject: "",
     // // body: "",
     // // subscriberIds: [""],
     // // altTopicId: ""
     // currentPost: {
     //   id: "",
     //   text: "",
     //   completed: true
     // },
     posts: []
}


const addPost = (state, action) => {
  var postToAdd = action.message;
  var newPosts = state.posts.slice();
  newPosts.push(postToAdd);
  var newState = {};

  Object.assign(newState, state, {posts: newPosts});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};

function forumReducer(state = initialForumState, action) {
  switch (action.type) {
    case 'ADD_POST':
  return addPost(state, action);

  default:
    return state;
  }
}



export default forumReducer;
