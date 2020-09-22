import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import SubTask from "./SubTask";

class TodoItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: null,
            isDone: null,
            showAnimation: null,
            showSubTaskForm: null,
        }
    };
    componentDidMount() {
        this.setState({
            title: this.props.todo.title,
            isDone: this.props.todo.isDone,
        });
    };
    componentDidUpdate(prevProps) {
        if (prevProps.todo !== this.props.todo) {
            this.setState({
                title: this.props.todo.title,
                isDone: this.props.todo.isDone,
                showAnimation: null,
            })
        }
    }
    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.todo);
        } else {
            this.setState({showSubTaskForm: true});
        }
    };
    handleDeleteClick(e) {
        //make sure parent onClick event does not fire
        e.stopPropagation();
        this.props.onDelete(this.props.todo);
    };
    handleCheckboxClick(e) {
        //make sure parent onClick event does not fire
        e.stopPropagation();
        this.setState({
            isDone: !this.state.isDone,
            showAnimation: true,
        });
        this.props.onStatusChange(this.props.todo);
    };
    handleSubTaskUpdate(title) {
        const subTask = {...this.props.todo}
        subTask.title = title;
        this.props.onUpdate(subTask);
        this.setState({
            showSubTaskForm: false, 
            title: title,
        });
    };
    render() {
        if (this.state.showSubTaskForm) {
            return <SubTask subTask={this.props.todo} onUpdate={this.handleSubTaskUpdate.bind(this)} />;
        }
        let titleClassList = "todo-item-title";
        let checkboxClass = this.state.isDone ? "checkbox check" : "checkbox"
        if (this.state.showAnimation) {
            titleClassList = this.state.isDone ? titleClassList + " strike" : titleClassList + " unstrike"
        } else if (this.props.todo.isDone) {
            titleClassList = titleClassList + " done"
        }
        return (
            <div>
                <div className="todo-item-container" onClick={this.handleClick.bind(this)}>
                    <div className="todo-item">
                        <div className={checkboxClass} onClick={this.handleCheckboxClick.bind(this)}>
                            {this.state.isDone 
                                ?<FontAwesomeIcon 
                                    icon={faCheckCircle} 
                                    className="fa-icon fa-check" 
                                />
                                : null}
                        </div>
                        <div className={titleClassList}>{this.state.title}</div>
                        {this.state.isDone
                            ?<FontAwesomeIcon
                                icon={faTimesCircle}
                                className="fa-icon fa-x"
                                onClick={this.handleDeleteClick.bind(this)}
                            />
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    };
}

export default TodoItem;