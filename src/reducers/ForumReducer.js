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
  const newState = {};
  const newPost = { title: action.message.title, message: action.message.message };

  Object.assign(newState, state, {currentPost: newPost});

  return newState;
};

const setPosts = (state, action) => {
  const newState = {};
  const { posts } = state;

  Object.assign(newState, state, {posts: action.message});

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
