import React from "react"

import TodoItem from "./TodoItem";

import TextareaAutosize from 'react-textarea-autosize';

const TodoDetail = (props) => {
    return (
        <div className="todo-detail-container list">
            <div className="todo-detail-header">
                <div className="todo-title">TodoDetail Title</div>
                <div className="todo-item-priority">PRIORITY</div>
            </div>
            <TextareaAutosize placeholder="Insert your notes here" className="todo-item-notes"></TextareaAutosize>
            <div className="sub-tasks-container">
                <div className="sub-tasks-title sub-title">SUB TASKS</div>
                <TodoItem />
            </div>
            <div className="date-container">
                <div className="date-title sub-title">CREATED</div>
                <div className="date">Sept 2, 2020</div>
            </div>
        </div>
    )
}

export default TodoDetail;