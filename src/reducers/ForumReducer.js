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
     posts: [],
     currentPost: {
      title: '',
      message: ''
     }
}


const addPost = (state, action) => {
  console.log('this is your state in addPostFORUM: ', state)
  console.log('this is your brain on drugs');
  console.log('this is your action in addPostFORUM: ', action)
  const newState = {};
  const newPost = { title: action.message.title, message: action.message.message };

  Object.assign(newState, state, {currentPost: newPost});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};

const setPosts = (state, action) => {
  const newState = {};
  const { posts } = state;

  Object.assign(newState, state, {posts: action.message});

  console.log('(before) state: ', state);
  console.log('(after) state: ', newState);
  return newState;
};

function forumReducer(state = initialForumState, action) {
  switch (action.type) {
  case 'ADD_POST':
    return addPost(state, action);
  case 'SET_POSTS':
    return setPosts(state, action);
  default:
    return state;
  }
}



export default forumReducer;
