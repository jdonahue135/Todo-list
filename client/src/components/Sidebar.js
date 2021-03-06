import React from "react";

import Button from "./Button";

class Sidebar extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.selected !== prevProps.selected) {
            const todoList = document.getElementById("sidebar-" + this.props.selected);
            todoList.classList = todoList.classList + " project-selected"
        };
    };
    renderList(str, index) {
        const classList = this.props.selected === index ? "project project-selected" : "project"
        return (
            <div key={"sidebar-" + index} onClick={this.props.onListChange} id={"sidebar-" + index} className={classList}>{str}</div>
        )
    }

    render() {
        const todoLists = ["All Tasks", "Priority"];
        return (
            <div className="sidebar">
                <Button 
                    text="New To-Do" 
                    onClick={this.props.onNewTodo}
                />
                <div className="sidebar-content-container">
                    <div className="headline">Projects</div>
                    <div className="project-list">
                        {todoLists.map(list => this.renderList(list, todoLists.indexOf(list)))}
                    </div>
                </div>
                {this.props.user ? <div onClick={this.props.handleLogOut} className="log-out link">Log out</div>: null}
            </div>
        )
    }
}

export default Sidebar;