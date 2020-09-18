import React from "react"

import TodoItem from "./TodoItem";

const TodoList = (props) => {
    const todoLists = ["All Tasks", "Priority"];
    let todos = [...props.todos];
    if (todoLists[props.selectedList] === "Priority") {
        todos = todos.filter(todo => todo.priority === true);
    }
    if (todos.length === 0) {
        return (
            <div className="todo-list-container list">
                <div className="no-todos-container">
                    <div className="no-todos-headline">You're all done!</div>
                    <div className="no-todos-sub-headline">Enjoy your day or add a new task</div>
                </div>
            </div>
        )
    }
    return (
        <div className="todo-list-container list">
            <div className="todo-title">{todoLists[props.selectedList]}</div>
            <div className="todo-list">
                {props.todos ? todos.map(todo => (
                    <TodoItem 
                        onStatusChange={props.onStatusChange} 
                        onClick={props.onTodoClick} 
                        key={todos.indexOf(todo)} 
                        todo={todo}
                    />
                )): null}
            </div>
        </div>
    )
}

export default TodoList;