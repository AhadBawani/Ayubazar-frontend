import React from 'react';
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    return (
        <div className='flex justify-center items-center'>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '90%',
                    borderRadius: '32px',
                    border: "1px solid #ccc",
                    background: '#DFDFDF',
                    transition: 'border-color 0.3s ease',
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px',
                    }}
                >
                    <FaSearch size={22} className='text-gray-700'/>
                </span>
                <input
                    type="text"
                    placeholder="Search for products..."
                    style={{
                        flex: '1',
                        border: 'none',
                        outline: 'none',
                        padding: '12px',
                        borderRadius: '32px',
                        background: '#DFDFDF',
                    }}
                />
            </div>
        </div>
    )
}

export default SearchInput;