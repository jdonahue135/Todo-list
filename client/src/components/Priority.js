import React from "react";

const Priority = (props) => {
    return <div className={"priority-btn todo-form-priority" + props.class} onClick={props.onClick}>PRIORITY</div>
};

export default Priority;