import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class TodoItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isDone: null,
            showAnimation: false
        }
    };
    componentDidMount() {
        this.setState({
            isDone: this.props.todo.isDone,
        });
    };
    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.todo);
        };
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
    render() {
        let titleClassList = "todo-item-title";
        let checkboxClass = this.state.isDone ? "checkbox check" : "checkbox"
        if (this.state.showAnimation) {
            titleClassList = this.state.isDone ? titleClassList + " strike" : titleClassList + " unstrike"
        } else if (this.props.todo.isDone) {
            titleClassList = titleClassList + " done"
        }
        return (
            <div className="todo-item-container" onClick={this.handleClick.bind(this)}>
                <div className="todo-item">
                    <div className={checkboxClass} onClick={this.handleCheckboxClick.bind(this)}>
                        {this.state.isDone ? <FontAwesomeIcon icon={faCheckCircle} className="fa-check" /> : null}
                    </div>
                    <div className={titleClassList}>{this.props.todo.title}</div>
                </div>
            </div>
        )
    };
}

export default TodoItem;