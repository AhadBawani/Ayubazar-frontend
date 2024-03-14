import React from 'react';
import CountdownClock from './CountdownClock';

const OfferComponent = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1); // Adding 1 day

    return (
        <div className='bg-[#FAFAFA] p-8'>
            <CountdownClock expiryDate={expiryDate} />
        </div>
    );
}

export default OfferComponent;
