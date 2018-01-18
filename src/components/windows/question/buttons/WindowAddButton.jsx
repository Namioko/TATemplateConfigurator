import React from 'react';

const WindowAddButton = (props) => {
    return (
        <button className={props.className} onClick={props.onClick} title={props.title}>{props.text}</button>
    )
};

export default WindowAddButton;