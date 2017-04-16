const initialForumState = {
     subject: "",
     body: "",
     subscriberIds: [""],
     altTopicId: ""
}

const post = (state, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const posts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

export default posts;
