import React from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";

const OtherHoverOptions = () => {
    return (
        <>
            <div
                className='mt-2 p-2 ml-[-4px] bg-gray-800 rounded-full text-white absolute transition-transform'
                style={{
                    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                    opacity: '1',
                    transform: 'translateX(0)',
                }}>
                <MdOutlineRemoveRedEye size={16} className='cursor-pointer' />
            </div>
        </>
    );
}

export default OtherHoverOptions;