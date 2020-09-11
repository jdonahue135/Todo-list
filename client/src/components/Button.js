import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Button = (props) => {
    return (
        <div className="btn-container" onClick={props.onClick}> 
            <FontAwesomeIcon icon={faPlus} className="fa-plus"/>
            <div className="btn-text">{props.text}</div>
        </div>
    )
}

export default Button;