import React from 'react';
import '../styles/App.css';

import TodoForm from "./TodoForm";
import Sidebar from "./Sidebar";
import TodoDetail from "./TodoDetail";
import TodoList from "./TodoList";
import background from "../background.jpeg";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedList: null,
      todos: [{title: "dummy todo 0", priority: false, notes: "this is a note", isDone: false, date: Date.now, subTasks: [{title: "subtask 0", isDone: false}, {title: "subtask 1", isDone: true}]},
      {title: "dummy todo 1", priority: true, notes: "this is another note", isDone: true, date: Date.now, subTasks: [{title: "subtask 2", isDone: true}, {title: "subtask 3", isDone: false}]}],
      showOverlay: false,
      selectedTodo: null,
      user: null,
    }
  }
  componentDidMount() {
    this.setState({selectedList: 0})
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedList !== prevState.selectedList) {
      if (this.state.selectedList === 0) {
        this.setState({selectedTodo: this.state.todos[0]});
      } else {
        this.setState({selectedTodo: this.state.todos.filter(todo => todo.priority === true)[0]});
      }
    }
  }
  toggleOverlay() {
    this.setState({showOverlay: !this.state.showOverlay})
  }
  handleFormSubmit(data) {
    this.setState({showOverlay: false})
    const todo = {
      title: data.titleInput,
      priority: data.priority,
      notes: data.notesInput,
      isDone: false,
      date: Date.now,
      subTasks: [],
    };
    let todos = [...this.state.todos];
    todos.push(todo);
    this.setState({todos});
  }
  handleListChange(e) {
    const selectedList = parseInt(e.target.id.replace("sidebar-", ""));
    this.setState({selectedList});
  }
  handleSelectedTodo(selectedTodo) {
    this.setState({selectedTodo});
  }
  handleNotesChange(notesText, todo) {
    let todos = [...this.state.todos];
    todos[todos.indexOf(todo)].notes = notesText;
    this.setState({todos});
  };
  handleTitleChange(titleText, todo) {
    let todos = [...this.state.todos];
    todos[todos.indexOf(todo)].title = titleText;
    this.setState({todos});
  };
  handlePriorityChange() {
    let todos = [...this.state.todos];
    todos[todos.indexOf(this.state.selectedTodo)].priority = !todos[todos.indexOf(this.state.selectedTodo)].priority;
    this.setState({todos});
  };
  handleTodoStatusToggle(todo) {
    let todos = [...this.state.todos];
    //check if todo item is a subtask
    const target = todo.subTasks ? todos[todos.indexOf(todo)]: todos[todos.indexOf(this.state.selectedTodo)].subTasks[todos[todos.indexOf(this.state.selectedTodo)].subTasks.indexOf(todo)];
    target.isDone = !target.isDone;
    this.setState({todos});
  };
  handleSubTaskSubmit(title) {
    let todos = [...this.state.todos];
    const subTask = {
      title: title,
      isDone: false,
    };
    todos[todos.indexOf(this.state.selectedTodo)].subTasks.push(subTask);
    this.setState({todos});
  }
  render() {
    return (
      <div className="App">
        {this.state.showOverlay 
          ? <div>
              <TodoForm onSubmit={this.handleFormSubmit.bind(this)} onClickAway={this.toggleOverlay.bind(this)}/>
              <div className="overlay" />
            </div> 
          : null}
        <Sidebar onListChange={this.handleListChange.bind(this)} selected={this.state.selectedList} onNewTodo={this.toggleOverlay.bind(this)}/>
        <div className="background-container">
          <img className="background" src={background} alt="background" />
        </div>
        <div className="main">
          <div className="title-container">
            <div className="title">{this.state.user ? "Welcome, " + this.state.user : <div><span className="link">Login</span> or <span className="link">Sign up</span> to save todos</div>}</div>
          </div>
          <div className="content">
            <TodoList selectedList={this.state.selectedList} onTodoClick={this.handleSelectedTodo.bind(this)} todos={this.state.todos} onStatusChange={this.handleTodoStatusToggle.bind(this)} />
            {this.state.selectedTodo ? <TodoDetail todo={this.state.selectedTodo} onTitleChange={this.handleTitleChange.bind(this)} onNotesChange={this.handleNotesChange.bind(this)} onPriorityChange={this.handlePriorityChange.bind(this)} onStatusChange={this.handleTodoStatusToggle.bind(this)} onSubTaskSubmit={this.handleSubTaskSubmit.bind(this)} /> : null}
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
