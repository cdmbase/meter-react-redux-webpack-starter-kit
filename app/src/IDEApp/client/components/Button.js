import React, { PropTypes } from 'react';


const Button = (onButtonClick, name) => {
    const onClick = (event) => {
        event.preventDefault();
        onButtonClick();

    };
    return (
        <button onClick={onButtonClick}>{name}</button>
    )
};

Button.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};
export default Button;