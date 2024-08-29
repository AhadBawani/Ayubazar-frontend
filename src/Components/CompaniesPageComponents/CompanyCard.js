import React from 'react'
import Requests from '../../RequestHandlers/Requests/Requests'

const CompanyCard = ({ company, index }) => {
     return (
          <>
               <div key={index}
                    className='sm:w-auto sm:h-auto shadow-xl rounded-lg flex justify-center items-center'>
                    <img
                         src={Requests.GET_COMPANY_IMAGES + company?.companyImage}
                         className='sm:h-[180px] sm:w-[190px] h-[110px] w-[180px] p-4'
                         alt={company?.companyName} />
               </div>
               <div className='mt-2'>
                    <span
                         className='text-[#333] hover:text-[#d0bdac]
                        cursor-pointer text-lg font-semibold overflow-hidden'
                         style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2, // Limit to two lines
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                         }}
                    >
                         {company?.companyName}
                    </span>
               </div>
          </>
     )
}

export default CompanyCard