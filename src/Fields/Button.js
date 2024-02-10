import React from 'react'

const Button = ({ text, color, hoverColor, onClick, width }) => {
    const buttonStyle = {
        backgroundColor: color,
        transition: 'background-color 0.3s',
        width: width ? width : "100%"
    };    

    return (
        <button
            className='p-2 rounded-lg w-full text-white text-lg font-medium uppercase outline-none'
            style={buttonStyle}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = hoverColor; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = color; }}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;