import React from 'react'
import { api } from '@/app/apiEndpoint'
import Loading from '@/app/Loading';
import Image from 'next/image'
import style from './yourblogs.module.scss'

const MyBlogs = ({ updateBlog, deleteBlog, blogs }) => {
    return (
        <div>
            {blogs.length === 0 ? <Loading /> : blogs.map((elem, idx) => {
                return (
                    <div className={style.user_blog_container} key={idx}>
                        <Image src={`${api}/uploads/${elem?.image}`} alt={elem?.title}
                            width={100} height={100}
                        />
                        <div className={style.title_container}>
                            <span>{elem?.title}</span>
                            <span>{elem?.createdAt.slice(0, 10)}</span>
                        </div>
                        <div className={style.edit_delete_container}>
                            <span onClick={() => updateBlog(elem)}>edit</span>
                            <span onClick={() => deleteBlog(idx)}>delete</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MyBlogs
