import React, { useState } from 'react';

const StarRating = ({ starValue, showProgressBar, clickable = true, setStarValue }) => {
    const [hoverValue, setHoverValue] = useState(0);

    const handleHover = (value) => {
        if (!clickable) return; // Disable hover effect if not clickable
        setHoverValue(value);
    };

    const handleMouseLeave = () => {
        setHoverValue(0);
    };

    const handleClick = (value) => {
        if (!clickable) return; // Disable click effect if not clickable
        // Handle click event if needed
        setStarValue(value)
    };

    const percentage = !clickable ? 0 : ((starValue || hoverValue) / 5) * 100;

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 fill-current cursor-pointer ${star > 1 ? 'ml-2' : ''}`}
                    viewBox="0 0 24 24"
                    onMouseEnter={() => handleHover(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                >
                    <path
                        fill={(starValue >= star || hoverValue >= star) ? '#FFD700' : 'none'}
                        stroke={(starValue >= star || hoverValue >= star) ? '#FFD700' : '#EBEBEB'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"
                    />
                </svg>
            ))}
            {showProgressBar && (
                <div className="flex items-center flex-grow ml-4">
                    <div className="bg-gray-200 flex-grow h-3 rounded-md">
                        <div className="bg-yellow-400 h-full rounded-md" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span style={{ fontSize: '90%' }} className="ml-2 text-[#999]">{percentage.toFixed(0)}%</span>
                </div>
            )}
        </div>
    );
};

export default StarRating;
