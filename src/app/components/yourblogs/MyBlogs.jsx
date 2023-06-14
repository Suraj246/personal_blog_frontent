"use client"
import React, { useEffect, useState } from 'react'
import { api } from '@/app/apiEndpoint'
import Image from 'next/image'
import style from './yourblogs.module.scss'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserBlogsApi, deleteBlogsApi, updateUserBlogsApi } from '@/app/redux/actions/blogActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const MyBlogs = () => {
    const router = useRouter()
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const userBlogsData = useSelector(state => state.currentUserBlogs)
    const { userBlogs, error } = userBlogsData
    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : []
    var userId = userData?.userId

    useEffect(() => {
        dispatch(currentUserBlogsApi(userId))
    }, [dispatch, userId, refresh])


    const deleteBlog = (idx) => {
        setRefresh(!refresh)
        dispatch(deleteBlogsApi(userId, idx))
    }
    const updateBlog = (item) => {
        dispatch(updateUserBlogsApi(item))
        router.push("/create-post")
    }

    return (
        <div className={style.user_blogs}>
            {error ? <span className='text-2xl capitalize text-center'>{error}</span> :
                userBlogs?.data?.blogs?.map((elem, idx) => {
                    return (
                        <div className={style.user_blog_container} key={idx}>
                            <Link href={`/blog/${elem._id}`} >
                                <Image src={`${api}/uploads/${elem?.image}`} alt={elem?.title}
                                    width={200} height={200}
                                />
                            </Link>
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
