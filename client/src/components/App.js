import React from 'react';
import '../styles/App.css';

import Sidebar from "./Sidebar";
import TodoDetail from "./TodoDetail";
import TodoList from "./TodoList";
import background from "../background.jpeg";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="background-container">
        <img className="background" src={background} alt="background" />
      </div>
      <div className="main">
        <div className="title-container">
          <div className="title">Project Name</div>
        </div>
        <div className="content">
          <TodoList />
          <TodoDetail />
        </div>
      </div>
      
    </div>
  );
}

export default App;
