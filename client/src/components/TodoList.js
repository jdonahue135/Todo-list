import React from "react"

import TodoItem from "./TodoItem";

const TodoList = (props) => {
    return (
        <div className="todo-list-container list">
            <div className="todo-title">Project Title</div>
            <div className="todo-list">
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </div>
        </div>
    )
}

export default TodoList;