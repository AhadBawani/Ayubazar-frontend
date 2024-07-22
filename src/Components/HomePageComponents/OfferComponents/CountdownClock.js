import React, { useState, useEffect, useCallback } from 'react';
import useProductsState from '../../../Hooks/useProductsState';

const CountdownClock = () => {
    const { discount } = useProductsState();

    const calculateTimeLeft = useCallback(() => {
        if (!discount || !discount.expiryDate) return {};

        const difference = +new Date(discount.expiryDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }, [discount]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    // Function to add flip animation class when time changes
    const getClassName = (unit) => {
        return timeLeft[unit] === 0 ? '' : 'flip'; // Add flip animation only if time is not zero
    };

    return (
        <>
            <div className='flex justify-center items-center mb-3'>
                <span className='text-3xl font-semibold text-[#333]'>OFFER EXPIRY IN : </span>
            </div>
            <div className="flex items-center justify-center space-x-2">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                        <div className={`text-2xl font-semibold animate-pulse ${getClassName(unit)}`}>{String(value).padStart(2, '0')}</div>
                        <div className="text-xs font-semibold">{unit}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CountdownClock;
