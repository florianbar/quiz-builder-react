import React from 'react';

const button = (props) => {
    const btnClasses = [props.className, "btn"];

    switch (props.btntype) {
        case "secondary": 
            btnClasses.push("btn-secondary"); 
            break;
        case "success": 
            btnClasses.push("btn-success");
            break;
        case "danger": 
            btnClasses.push("btn-danger");
            break;
        case "light": 
            btnClasses.push("btn-light");
            break;
        default: 
            btnClasses.push("btn-primary");
            break;
    }

    switch (props.btnsize) {
        case "sm": 
            btnClasses.push("btn-sm"); 
            break;
        case "lg": 
            btnClasses.push("btn-lg");
            break;
        default: 
            break;
    }

    return (
        <button
            disabled={props.disabled}
            className={btnClasses.join(" ")}
            onClick={props.clicked}
            style={props.style}>
            {props.children}
        </button>
    );
};

export default button;