import React from 'react'
import MyBlogs from '../components/yourblogs/MyBlogs'

export const metadata = {
    title: 'Your Blogs',
}


const page = () => {
    return (
        <div>
            <MyBlogs />
        </div>
    )
}

export default page
