import React from 'react'

const TodoList = React.createClass({

  render () {
    const { todo, remove, todoId } = this.props;
    return (
        <tr>
          <td>{todo}</td>
        <td><button className="btn btn-danger btn-xs" onClick={() => {remove(todoId)}} >x</button></td>
        </tr>
    )
  }
});

export default TodoList