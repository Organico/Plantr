import React from 'react'
import TodoList from './TodoList'
import { connect } from 'react-redux'
import { removeTodo } from './action'
import axios from 'axios'

const Todo  = React.createClass({
  removeTodo (id) {
    const { dispatchRemoveTodo } = this.props;
    axios.delete('http://localhost:3000/api/todos/' +id)
        .then((res) => {
          dispatchRemoveTodo(id);
        });
  },
  render: function () {
    const { todos, searchTerm } = this.props;
    return (
        <table className="table table-xs">
          <thead className="thead-default">
          <tr>
            <th>To-do</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {console.log(`todos in Todo.js render ${JSON.stringify(todos)}`)}
          {todos
              .filter((todo)=> {
                return `${todo.task}`.indexOf(searchTerm) > -1;
              })
              .map((todo) => {
                return (
                    <TodoList key={todo._id} todo={todo.task} todoId={todo._id} remove={this.removeTodo}/>
                )
              })}
          </tbody>
        </table>
    )
  }
});


function mapStateToProps(state) {
  return {
    todos: state.todos,
    searchTerm: state.searchTerm
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchRemoveTodo(id) {
      dispatch(removeTodo(id))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);