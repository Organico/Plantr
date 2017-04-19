// here will be our Login Action folder

export function addPost(message) {
  return {type: 'ADD_POST', message};
}

export function togglePost(id) {
  return {type: 'TOGGLE_POST', id};
}

export function setPosts(message) {
  console.log('SET POST IS BEING SET')
  return {type: 'SET_POSTS', message};
}

export function addReply(message) {
  return {type: 'ADD_REPLY', message};
}