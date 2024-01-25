import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Assuming eye icons are from 'react-icons/fi'

const Input = ({ type, onChange, name, error, disabled, bgColor, defaultValue, value }) => {
    const [showPassword, setShowPassword] = useState(false);
    const borderColor = error ? 'red' : '#d3d3d3';

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div style={{ position: 'relative' }}>
            <input
                className='p-2 rounded-lg w-full outline-none'
                style={{ border: `1px solid ${borderColor}`, backgroundColor:bgColor }}
                type={showPassword ? 'text' : type}
                autoComplete={false}
                onChange={onChange}
                value={value}
                name={name}
                disabled={disabled}
                defaultValue={defaultValue}
            />
            {!disabled && type === 'password' && (
                <span
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                    }}
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
            )}
        </div>
    );
};

export default Input;
