import React from 'react'

const ShippingPolicy = () => {
    return (
        <div className=' bg-gray-100 w-full flex justify-center items-center'>
            <div className="bg-white p-8 rounded-lg shadow-md w-[90%] my-8">
                <div className='text-[#333] font-bold text-2xl'>
                    <span>Shipping Policy</span>
                </div>
                <div className='text-[#333] font-bold text-2xl mt-8'>
                    <span>WHERE WE SHIP FROM</span>
                </div>
                <div className='mt-4 flex flex-col space-y-4 text-[#999]'>
                    <span>All orders are shipped out of our centrally located distribution center in Rajkot, Gujarat, India. We offer free shipping on all orders above ₹499.</span>
                </div>
                <div className='text-[#333] font-bold text-2xl mt-8'>
                    <span>SHIPPING INFORMATION</span>
                </div>
                <div className='mt-4 flex flex-col space-y-4 text-[#999]'>
                    <span>Orders placed before 6:00 pm IST will be shipped out the same day. Shipping times vary from 2-5 business days depending on your location. The closer you are to Rajkot, GJ, the faster your order will get to you.</span>
                </div>
                <div className='text-[#333] font-bold text-2xl mt-8'>
                    <span>FAST SHIPPING</span>
                </div>
                <div className='mt-4 flex flex-col space-y-4 text-[#999]'>
                    <span>We provide 1-Day/2-Day shipping in all over Gujarat.</span>
                </div>
                <div className='text-[#333] font-bold text-2xl mt-8'>
                    <span>DELIVERY TIME</span>
                </div>
                <div className='mt-4 flex flex-col space-y-4 text-[#999]'>
                    <span>Standard delivery time is 5-7 business days depending on the pin-code of shipping address.</span>
                    <span>In case of remote locations, delivery time may be extended up to 10 business days.</span>
                    <span>In case of any questions about the expected delivery time for your address, please call us at +91 9428560666 or email us at support@ayubazar.com.</span>
                </div>
            </div>
        </div>
    )
}

export default ShippingPolicy;