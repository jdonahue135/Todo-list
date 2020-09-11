import React from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { ClickAwayListener } from '@material-ui/core';

import Priority from "./Priority";

class TodoForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            titleInput: "",
            notesInput: "",
            priority: false,
        }
    }
    handleTitleInputChange(e) {
        const string = e.target.value.trim();
        this.setState({
            titleInput: string,
        });
    }
    handleNotesInputChange(e) {
        const string = e.target.value.trim();
        this.setState({
            notesInput: string,
        });
    }
    togglePriority() {
        this.setState({priority: !this.state.priority})
    }
    handleFormSubmit() {
        if (this.state.titleInput.length > 0) {
            this.props.onSubmit(this.state);
            //clear state
            this.clearState();
            
        }
    }
    clearState() {
        this.setState({
            titleInput: "",
            notesInput: "",
            priority: false,
        });
    }
    handleClickAway() {
        this.clearState();
        this.props.onClickAway();
    }
    render() {
        const footerClass = this.state.titleInput.length > 0 ? " footer-active": "";
        const priorityClass = this.state.priority === true ? " high-priority" : "";
        return (
            <ClickAwayListener onClickAway={this.handleClickAway.bind(this)}>
                <div className="todo-form">
                    <Priority class={priorityClass} onClick={this.togglePriority.bind(this)} />
                    <TextareaAutosize onChange={this.handleTitleInputChange.bind(this)} maxLength={50} className="text-area-autosize todo-form-title" placeholder="I need to..." />
                    <div className="notes-title sub-title">NOTES</div>
                    <TextareaAutosize onChange={this.handleNotesInputChange.bind(this)} maxLength={240} placeholder="Insert your notes here" className="text-area-autosize todo-item-notes todo-form-notes"></TextareaAutosize>
                    <div onClick={this.handleFormSubmit.bind(this)} className={"todo-form-footer" + footerClass}>Add Todo</div>
                </div>
            </ClickAwayListener>
        )
    }
}

export default TodoForm;