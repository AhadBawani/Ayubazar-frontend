import React from 'react'

const OptionSelection = ({ selectedOption, setSelectedOption, showOptions }) => {
    const handleOptionSelect = (e, opt) => {
        e.stopPropagation();
        setSelectedOption(opt);
    }
    return (
        <div
            className='absolute p-2 h-[150px] overflow-auto
                bg-white w-2/3 space-y-1 bottom-0'>
            <span className='text-sm'>Weight</span>
            {showOptions?.length > 0
                &&
                showOptions.map((option, index) => {
                    return <div key={index}>
                        {
                            selectedOption &&
                                Object.keys(selectedOption)[0] === Object.keys(option)[0]
                                ?
                                <>
                                    <div
                                        key={index}
                                        className='p-1 text-center text-sm text-white bg-[#D0BDAC]'
                                        onClick={(e) => handleOptionSelect(e, option)}
                                    >
                                        {Object.keys(option)}
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
                                        {Object.keys(option)}
                                    </div>
                                </>
                        }
                    </div>
                })}
        </div>
    )
}

export default OptionSelection