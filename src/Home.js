import React from 'react'
import { connect } from 'react-redux'
import { setSearchTerm, addTodo } from './action'
import axios from 'axios'

const Home = React.createClass({

  addTodo (task) {
    console.log(`addTodo ${task}`);
    axios.post('http://localhost:3000/api/todos/', {"task" : task})   //[{"_id":"58d346b2f70e8d47a740112e","task":"get milk","__v":0}]
        .then((res) => {
          console.log(`addTodo res ${JSON.stringify(res.data)}`);
          this.props.dispatchAddTodo(res.data);
        });
  },
  render () {
    let input;
    return (
        <div className="text-center">
          <input ref={(node) => input = node } type="text" name="todo" placeholder='add a todo ...'/>
          <button className="btn btn-primary btn-sm" onClick={() => {
            this.addTodo(input.value);
            input.value = '';
          }} type="submit">add
          </button>
          <div>
            <input type="text"
                   onChange={(e) => {
                     this.props.dispatchSetSearchTerm(e.target.value)
                   }}
                   value={this.props.searchTerm}
                    placeholder='search ...'/>
          </div>
        </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  }
};

const mapDispatchToProps = (dispatch) => {
  // console.log(`setSearchTerm ${setSearchTerm}`);
  return {
    dispatchSetSearchTerm (searchTerm) {
      dispatch(setSearchTerm(searchTerm))
    },
    dispatchAddTodo(todo) {
      dispatch(addTodo(todo))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
