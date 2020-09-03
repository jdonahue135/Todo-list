import React from "react"

const TodoItem = (props) => {
    return (
        <div className="todo-item-container">
            <div className="todo-item">
                <div className="checkbox" />
                <div className="todo-item-title">TodoItem</div>
            </div>
        </div>
    )
}

export default TodoItem;