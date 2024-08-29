import React from 'react'


const Header = () => {
    const option = [
        {
            code: '01',
            title: 'Shopping Cart',
            body: 'Manage Your Items List'
        },
        {
            code: '02',
            title: 'Checkout Details',
            body: 'Checkout Your Items List',
        },
        {
            code: '03',
            title: 'Order Complete',
            body: 'Review Your Order'
        }
    ];

    return (
        <>
            <div className='bg-[#FAFAFA]'
                style={{
                    border: 'solid 1px #ECECEC'
                }}
            >
                <div className='flex justify-between m-4 p-4 mx-12'>
                    {
                        option.map((item, index) => {
                            return <div className='flex text-[#3c4043] transition-all ease-in-out
                            duration-300 cursor-pointer' key={index}>
                                <div>
                                    <span
                                        style={{
                                            fontSize: '400%',
                                            lineHeight: '0.9',
                                            fontWeight: '700',
                                            textRendering: 'optimizeLegibility'
                                        }}
                                    >
                                        {item.code}
                                    </span>
                                </div>
                                <div className='flex flex-col mt-1 ml-1'>
                                    <span className='uppercase font-bold'
                                        style={{
                                            fontSize: '20px',
                                            lineHeight: '1.2',
                                            textRendering: 'optimizeLegibility'
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                    <span className='mt-1'
                                        style={{
                                            fontSize: '100%',
                                            textRendering: 'optimizeLegibility'
                                        }}
                                    >
                                        {item.body}
                                    </span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Header;