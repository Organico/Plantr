// here will be our Login Action folder

export function addPost(message){
  console.log('action: SET_GARDEN from db called');

  return {type: 'ADD_POST', message};
}