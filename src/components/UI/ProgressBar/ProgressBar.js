import React from 'react';

const progressBar = (props) => {
    const progressBarWidth = 100 / props.total * (props.value + 1);

    return (
        <div 
            className="progress mb-3" 
            style={{ backgroundColor: "#fff" }}>
            <div 
                className="progress-bar" 
                role="progressbar" 
                style={{ width: `${progressBarWidth}%` }} 
                aria-valuenow="25" 
                aria-valuemin="0" 
                aria-valuemax="100"></div>
        </div>
    );
};

export default progressBar;