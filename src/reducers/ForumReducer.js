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

const togglePost = (state, action) => {
  const newState = {};
  console.log("The id in the reducer is", action.id)

  let newPosts = state.posts.slice();
  const { posts } = state;

  for (let i = 0; i<newPosts.length; i++) {
    let individualMessage = newPosts[i];
    let individualMessageId = individualMessage['_id'];
    console.log("Message is: ", individualMessage, "Id is ",  individualMessageId)
    if (individualMessageId === action.id){
      individualMessage.isShort = !individualMessage.isShort;
    }
  }

  Object.assign(newState, state, {posts: newPosts});

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
  case 'TOGGLE_POST':
    return togglePost(state, action);
  default:
    return state;
  }
}


export default forumReducer;
