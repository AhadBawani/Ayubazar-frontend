import React from 'react'
import { toast } from 'react-toastify';

const OptionSelection = ({ selectedOption, setSelectedOption, showOptions }) => {
    const handleOptionSelect = (e, opt) => {
        e.stopPropagation();
        setSelectedOption(opt);
    }
    const unAvailableHandle = (e) => {
        e.stopPropagation();
        toast.error('Currently variation not available!');
    }
    return (
        <div
            className='absolute p-2 md:h-[150px] overflow-auto
                bg-white w-2/3 space-y-1 md:bottom-0 transition-all'>
            <span className='text-sm'>Weight</span>
            {showOptions?.length > 0
                &&
                showOptions.map((option, index) => {
                    return <div key={index}>
                        {
                            Object.values(option)[1] <= 0
                                ?
                                <>
                                    <>
                                        <div
                                            key={index}
                                            className='p-1 text-center text-sm text-white bg-gray-300'
                                            onClick={(e) => unAvailableHandle(e)}
                                        >
                                            {Object.keys(option)[0]}
                                        </div>
                                    </>
                                </>
                                :
                                <>
                                    {
                                        selectedOption &&
                                            Object.keys(selectedOption)[0] === Object.keys(option)[0]
                                            ?
                                            <>
                                                <div
                                                    key={index}
                                                    className='p-1 text-center text-sm text-white bg-[#074900]'
                                                    onClick={(e) => handleOptionSelect(e, option)}
                                                >
                                                    {Object.keys(option)[0]}
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div
                                                    key={index}
                                                    className='p-1 text-center text-sm border
                                                    border-gray-500 
                                                    hover:text-[#d0bdac]'
                                                    onClick={(e) => handleOptionSelect(e, option)}
                                                >
                                                    {Object.keys(option)[0]}
                                                </div>
                                            </>
                                    }
                                </>
                        }
                    </div>
                })}
        </div>
    )
}

export default OptionSelection