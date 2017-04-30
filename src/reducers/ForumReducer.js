const initialForumState = {
  messageToEdit: '',
  editing: false,
  posts: [],
  currentPost: {
    title: '',
    message: '',
    replies: [],
    editing: false
  }
}


const addPost = (state, action) => {
  let newState = {};
  let newPost = { title: action.message.title, message: action.message.message };
  Object.assign(newState, state, {currentPost: newPost});
  return newState;
};

const togglePost = (state, action) => {
  let newState = {};
  let newPosts = state.posts.slice();
  let { posts } = state;
  for (let i = 0; i<newPosts.length; i++) {
    let individualMessage = newPosts[i];
    let individualMessageId = individualMessage['_id'];
    if (individualMessageId === action.id) {
      individualMessage.isShort = !individualMessage.isShort;
    }
  }
  Object.assign(newState, state, {posts: newPosts});
  return newState;
};

const setEditing = (state, action) => {
  let newState = {};
  Object.assign(newState, state, { editing: !state.editing, messageToEdit: action.editing});
  return newState;
};

const setPosts = (state, action) => {
  let newState = {};
  let { posts } = state;
  Object.assign(newState, state, {posts: action.message});
  return newState;
};

const setReplies = (state, action) => {
  let newState = {};
  let { replies } = state;
  Object.assign(newState, state, {replies: action.message});
  return newState;
};

function forumReducer(state = initialForumState, action) {
  switch (action.type) {
  case 'ADD_POST':
    return addPost(state, action);
  case 'SET_POSTS':
    return setPosts(state, action);
  case 'SET_EDITING':
    return setEditing(state, action);
  case 'TOGGLE_POST':
    return togglePost(state, action);
  case 'ADD_REPLY':
    return addReply(state, action);
  default:
    return state;
  }
}

export default forumReducer;
