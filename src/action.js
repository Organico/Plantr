export function setSearchTerm(searchTerm) {
  console.log('action: SearchTerm called');
  return { type: 'SET_SEARCH_TERM', searchTerm };
}

export function addTodo(todo) {
  console.log('action: addTodo called');
  return { type: 'ADD_TODO', todo };
}

export function removeTodo(id) {
  console.log('action: removeTodo called');
  return { type: 'REMOVE_TODO', id };
}

export function movePiece(location){
  console.log('action: movePiece called');
  return {type: 'MOVE_PIECE', location}
}