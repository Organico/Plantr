// here will be our Login Action folder

export function addPost(message) {
  return {type: 'ADD_POST', message};
}

export function setPosts(message) {
  console.log('SET POST IS BEING SET')
  return {type: 'SET_POSTS', message};
}