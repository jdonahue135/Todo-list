import React from "react";

const Button = (props) => {
    return (
        <div className="btn-container">
            <div className="btn-text">{props.text}</div>
        </div>
    )
}

export default Button;