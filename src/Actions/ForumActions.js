// here will be our Login Action folder

let postId = 0;
export const addPost = (text) => {
  return {
    type: 'ADD_POST',
    id: (postId++).toString(),
    text,
  };
};