import React from 'react';
import '../styles/App.css';
import { storageAvailable } from "../localStorage";

import LogIn from "./LogIn";
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
      todos: [],
      showOverlay: false,
      showLogInForm: false,
      showSignUpForm: false,
      selectedTodo: null,
      user: null,
      jwt: null,
      usernameInput: "",
      passwordInput: "",
      showLoginWarning: null,
      updateBackend: false,
    };
  };
  componentDidMount() {
    this.setState({selectedList: 0});
    if (storageAvailable("localStorage")) {
      if (
        localStorage.getItem("jwt") !== "null" &&
        localStorage.getItem("jwt") !== null &&
        localStorage.getItem("user") !== null &&
        localStorage.getItem("user") !== "null"
      ) {
        //update state with token and user
        const jwt = localStorage.getItem("jwt");
        const user = JSON.parse(localStorage.getItem("user"));

        this.setState({
          jwt,
          user
        });
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.user && this.state.user !== prevState.user) {
      this.fetchTodos();
    }
    if (this.state.todos && this.state.selectedList !== prevState.selectedList) {
      if (this.state.selectedList === 0) {
        this.setState({selectedTodo: this.state.todos[0]});
      } else {
        this.setState({selectedTodo: this.state.todos.filter(todo => todo.priority === true)[0]});
      }
    }
    if (prevState.jwt !== this.state.jwt) {
      //save jwt and user to local storage
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      localStorage.setItem("jwt", this.state.jwt);
      localStorage.setItem("user", JSON.stringify(this.state.user));
    }

    //update selectedTodo on backend if changed

  };
  fetchTodos() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.state.jwt,
      },
    };

    const url = "/todos/" + this.state.user._id

    fetch(url, requestOptions)
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          console.log(res.message);
          return;
        } else {
          this.setState({todos: res.todos})
        }
      })
  }
  toggleOverlay() {
    this.setState({showOverlay: !this.state.showOverlay})
  };
  handleFormSubmit(data) {
    this.setState({showOverlay: false});
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
    if (!this.state.user) {
      this.setState({todos});
    } else {

      //TODO: Fetch request if user is logged in
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + this.state.jwt,
        },
        body: JSON.stringify({
          user: this.state.user,
          todo: todo,
        }),
      };

      fetch("/todos", requestOptions)
        .then(res => res.json())
        .then(res => {
          if (!res.success) {
            console.log(res.message)
          } else {
            this.setState({todos: res.todos})
          }
        })
    }
  };
  handleListChange(e) {
    const selectedList = parseInt(e.target.id.replace("sidebar-", ""));
    this.setState({selectedList});
  };
  handleSelectedTodo(selectedTodo) {
    this.setState({selectedTodo});
  };
  handleTodoStatusToggle(todo) {
    let todos = [...this.state.todos];
    //check if todo item is a subtask
    const target = todo.subTasks ? todos[todos.indexOf(todo)]: todos[todos.indexOf(this.state.selectedTodo)].subTasks[todos[todos.indexOf(this.state.selectedTodo)].subTasks.indexOf(todo)];
    target.isDone = !target.isDone;
    this.setState({todos});
  };
  handleTodoUpdate(e) {
    let todos = [...this.state.todos];
    let todoIndex = todos.indexOf(this.state.selectedTodo)
    if (!e.target.value) {
      todos[todoIndex][e.target.id] = !todos[todoIndex][e.target.id];
    } else {
      todos[todoIndex][e.target.id] = e.target.value;
    }
    const updateBackend = this.state.user ? true : false;
    this.setState({
      todos: todos,
      selectedTodo: todos[todoIndex],
      updateBackend: updateBackend,
    });
  };
  handleSubTaskSubmit(title) {
    let todos = [...this.state.todos];
    const subTask = {
      title: title,
      isDone: false,
    };
    todos[todos.indexOf(this.state.selectedTodo)].subTasks.push(subTask);
    this.setState({todos});
  };
  handleAccountClick(e) {
    if (e.target.id === "log-in") {
      this.setState({showLogInForm: true});
    } else {
      this.setState({showSignUpForm: true});
    }
  };
  handleCancelClick() {
    this.setState({
      usernameInput: "", 
      passwordInput: "",
      showSignUpForm: false,
      showLogInForm: false
    });
  };
  handleInputChange(e) {
    this.setState({[e.target.name + "Input"] : e.target.value})
  };
  handleLogIn() {
    if (!this.state.usernameInput || !this.state.passwordInput) return;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.usernameInput,
        password: this.state.passwordInput,
      }),
    };

    fetch("/users/login", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          //this.setState({ showLoginWarning: true });
        } else {
          this.setState({
            jwt: res.token,
            user: res.user,
            showLogInForm: false,
            //showLoginWarning: false,
          });
        }
      })
      .catch((err) => console.log(err));  
  };
  handleSignUp() {
    if (!this.state.usernameInput || !this.state.passwordInput) return;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.usernameInput,
          password: this.state.passwordInput,
          todos: this.state.todos,
        }),
      };
    fetch("/users/signup", requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({
            jwt: res.token,
            user: res.user,
            showSignUpForm: false,
          })
        } else {
          this.setState({showLoginWarning: true})
        }
      }
      )
      .catch((err) => console.log(err));
  };
  handleLogOut() {
    //remove user and jwt from localStorage
    localStorage.clear();

    //logs user out of state and clears tweet cache
    this.setState({
      user: null,
      jwt: null,
      todos: [],
    });
  }
  render() {
    let isButtonEnabled = false;
    if (this.state.usernameInput.length > 0 && this.state.passwordInput.length > 0) {
      isButtonEnabled = true;
    }
    const isLoggedIn = this.state.user ? true : false;
    return (
      <div className="App">
        {this.state.showOverlay 
          ? <div>
              <TodoForm 
                onSubmit={this.handleFormSubmit.bind(this)} 
                onClickAway={this.toggleOverlay.bind(this)}
              />
              <div className="overlay" />
            </div> 
          : null}
        {this.state.showLogInForm 
          ? <div>
              <LogIn 
                onInputChange={this.handleInputChange.bind(this)} 
                handleCancel={this.handleCancelClick.bind(this)} 
                signUp={false} 
                onSubmit={this.handleLogIn.bind(this)} 
                buttonEnabled={isButtonEnabled} 
                warning={this.state.showLoginWarning}
              />
              <div className="overlay" />
            </div> 
          : null}
          {this.state.showSignUpForm 
          ? <div>
              <LogIn 
                onInputChange={this.handleInputChange.bind(this)} 
                handleCancel={this.handleCancelClick.bind(this)} 
                signUp={true} 
                onSubmit={this.handleSignUp.bind(this)} 
                buttonEnabled={isButtonEnabled}
              />
              <div className="overlay" />
            </div> 
          : null}
        <Sidebar 
          user={isLoggedIn} 
          handleLogOut={this.handleLogOut.bind(this)} 
          onListChange={this.handleListChange.bind(this)} 
          selected={this.state.selectedList} 
          onNewTodo={this.toggleOverlay.bind(this)}
        />
        <div className="background-container">
          <img className="background" src={background} alt="background" />
        </div>
        <div className="main">
          <div className="title-container">
            <div className="title">{this.state.user ? "Welcome, " + this.state.user.username : <div><span className="link" id="log-in" onClick={this.handleAccountClick.bind(this)}>Log in</span> or <span className="link" id="sign-up" onClick={this.handleAccountClick.bind(this)}>Sign up</span> to save todos</div>}</div>
          </div>
          <div className="content">
            <TodoList 
              selectedList={this.state.selectedList} 
              onTodoClick={this.handleSelectedTodo.bind(this)} 
              todos={this.state.todos} 
              onStatusChange={this.handleTodoStatusToggle.bind(this)} 
            />
            {this.state.selectedTodo 
              ? <TodoDetail 
                  todo={this.state.selectedTodo} 
                  onChange={this.handleTodoUpdate.bind(this)} 
                  onStatusChange={this.handleTodoStatusToggle.bind(this)} 
                  onSubTaskSubmit={this.handleSubTaskSubmit.bind(this)} 
                /> 
              : null
            }
          </div>
        </div>
      </div>
    );
  };
};

export default App;
