import React from "react";

import Button from "./Button";

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <Button text="New project" />
            <div className="sidebar-content-container">
                <div className="headline">Projects</div>
                <div className="project-list">
                    <div className="project">All Tasks</div>
                    <div className="project">Today</div>
                    <div className="project">This Week</div>
                    <div className="project">Priority</div>
                </div>
            </div>
            <div className="account"><span className="link">Login</span> or <span className="link">Sign up</span></div>
        </div>
    )
}

export default Sidebar;