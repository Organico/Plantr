export function addPost(message) {
  return {type: 'ADD_POST', message};
}

export function togglePost(id) {
  return {type: 'TOGGLE_POST', id};
}

export function setPosts(message) {
  return {type: 'SET_POSTS', message};
}

export function addReply(message) {
  return {type: 'ADD_REPLY', message};
}

export function setEditing(editing) {
  return {type: 'SET_EDITING', editing};
}