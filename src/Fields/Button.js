import React from 'react'

const Button = ({ text, onClick }) => {
    return (
        <button
            style={{
                letterSpacing: '2px',
                lineHeight: '1.4',
                height: '42px',
                fontSize: '12px'
            }}
            className='w-[100%] uppercase font-bold bg-[#027148] hover:bg-[#013220] outline-none
                    text-white p-2 rounded-md transition-all ease-in-out duration-200'
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;