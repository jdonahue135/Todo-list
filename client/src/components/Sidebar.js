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
                <Button text="New Todo" onClick={this.props.onNewTodo}/>
                <div className="sidebar-content-container">
                    <div className="headline">Projects</div>
                    <div className="project-list">
                        {todoLists.map(list => this.renderList(list, todoLists.indexOf(list)))}
                    </div>
                </div>
                <div className="account"><span className="link">Login</span> or <span className="link">Sign up</span></div>
            </div>
        )
    }
}

export default Sidebar;