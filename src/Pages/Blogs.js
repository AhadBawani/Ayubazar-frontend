import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllBlogHandler } from '../RequestHandlers/RequestHandler/CommonRequestHandler';
import { toast } from 'react-toastify';
import Requests from '../RequestHandlers/Requests/Requests';

const Blogs = () => {
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getAllBlogHandler()
            .then((response) => {
                if (response) {
                    setBlogs(response);
                }
            })
            .catch((error) => {
                toast.error(error);
            })
    }, [dispatch])
    return (
        <div className='flex flex-col justify-center w-full items-center'>
            {
                blogs?.map((blog, index) => {
                    return <>                        
                        <div key={blog._id} className='m-4 p-4'>
                            <div>
                                <img
                                    className='rounded-lg w-full h-full'
                                    style={{ objectFit: 'contain' }}
                                    src={Requests.GET_BLOG_IMAGE + blog?.blogImage}
                                    alt={blog?.blogTitle}
                                />
                            </div>
                            <div className='mt-6'>
                                <p className='text-3xl font-semibold text-[#333]'>{blog?.blogTitle}</p>
                            </div>
                            <div className='mt-4'>
                                {
                                    JSON.parse(blog?.blogText)?.map((text, index) => {
                                        return <>
                                            <p key={index}>{text?.value}</p>
                                            <br />
                                        </>
                                    })
                                }
                            </div>
                        </div>
                    </>
                })
            }
        </div>
    )
}

export default Blogs;