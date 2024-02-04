import React from 'react'
import { FaStar } from "react-icons/fa";
import './Styles/SingleProductFooter.css';

const SingleProductFooter = () => {
    return (
        <>            
            <div>
                <div className='text-center'>
                    <span className='footer-header'>
                        World’s Leading Online Ayurveda & Healthcare Platform
                    </span>
                </div>
                <div className='flex justify-between m-8'>
                    <div className='flex flex-col text-center'>
                        <span className='card-title-span'>
                            1000+
                        </span>
                        <span className='card-body-span'>
                            Ayurveda Products
                        </span>
                    </div>
                    <div className='flex flex-col text-center'>
                        <span className='card-title-span'>
                            25+
                        </span>
                        <span className='card-body-span'>
                            States Served
                        </span>
                    </div>
                    <div className='flex flex-col text-center'>
                        <span className='card-title-span'>
                            10k+
                        </span>
                        <span className='card-body-span'>
                            Monthly Visitors
                        </span>
                    </div>
                    <div className='flex flex-col text-center'>
                        <div className='flex justify-center items-center'>
                            <span className='card-title-span'>
                                4
                            </span>
                            <span className='card-title-span mt-[-4px] ml-1'>
                                <FaStar />
                            </span>
                        </div>
                        <span className='card-body-span'>
                            Google Rating
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProductFooter;