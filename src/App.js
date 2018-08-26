import React, { Component } from 'react';
import ToDoList from './ToDoList'
import {NEW, COMPLETE} from './common/constants/status';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          description: 'get some exercise',
          status: NEW,
        }
      ],
    };
    
    this.handleTodoToggle = this.handleTodoToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnEditComplete = this.handleOnEditComplete.bind(this);
  }
  
  render() {
    return (
      <div className="App">
        <ToDoList 
          {...this.state} 
          onChange={this.handleTodoToggle} 
          onSubmit={this.handleSubmit}
          onEditComplete={this.handleOnEditComplete}
        />
      </div>
    );
  }

  handleTodoToggle(e) {
    const newToDosArray = [...this.state.todos];
    newToDosArray[e.target.value].status = 
      newToDosArray[e.target.value].status === NEW ? COMPLETE : NEW
    
    this.setState({todos: newToDosArray})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      todos: [
        ...this.state.todos, 
        {
          description: e.target.toDoInput.value, 
          status: NEW,
        }
      ]
    });
    
    e.target.toDoInput.value = '';
    e.target.toDoInput.focus();
  }

  handleOnEditComplete(update) {
    const newToDosArray = [...this.state.todos];
    newToDosArray[update.id].description = update.newText;
    this.setState({todos: newToDosArray})
  }

}

export default App;
