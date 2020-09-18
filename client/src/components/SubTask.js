import React from "react";
import TextareaAutosize from 'react-textarea-autosize';

class SubTask extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            titleInput: ""
        };
    };
    handleInputChange(e) {
        if (this.state.titleInput.length === 0 && e.target.value.trim().length === 0) {
            return;
        } else {
            this.setState({titleInput: e.target.value});
        }
    };
    handleBlur(e) {
        if (this.state.titleInput.trim().length > 0) {
            this.props.onSubTaskSubmit(this.state.titleInput);
            this.setState({titleInput: ""});
        };
    };
    handleKeyDown(e) {
        if (e.keyCode === 13 && this.state.titleInput.trim().length > 0) {
            //enter button pressed
            this.props.onSubTaskSubmit(this.state.titleInput);
            this.setState({titleInput: ""});
        };
    };

    render() {
        return (
            <div className="todo-item-container">
                <div className="todo-item">
                    <div className="checkbox" />
                    <TextareaAutosize 
                        className="text-area-autosize sub-task-form" 
                        placeholder="Add a new subtask" 
                        onChange={this.handleInputChange.bind(this)} 
                        value={this.state.titleInput} 
                        onBlur={this.handleBlur.bind(this)} 
                        onKeyDown={this.handleKeyDown.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default SubTask;