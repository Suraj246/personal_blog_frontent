"use client"
import React, { useEffect } from 'react'
import { api } from '@/app/apiEndpoint'
import Image from 'next/image'
import style from './yourblogs.module.scss'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { currentUserBlogsApi, deleteBlogsApi, updateBlogDetails } from '@/app/redux/slices/currentUserBlogsSlice'


const MyBlogs = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userBlogsData = useSelector(state => state.currentUserBlogs)
    const { userBlogs, status, error } = userBlogsData

    //getting current user id
    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : []
    var userId = userData?.userId

    // access current user blogs
    useEffect(() => {
        dispatch(currentUserBlogsApi(userId))
    }, [dispatch, userId, userBlogs])

    // delete blog
    const deleteBlog = (idx) => {
        dispatch(deleteBlogsApi({ userId, idx }))
    }

    // receiving update blog details
    const updateBlog = (item) => {
        dispatch(updateBlogDetails(item))
        router.push("/create-post")
    }

    return (
        <div className={style.user_blogs}>
            {error && <span className='text-2xl capitalize text-center'>{error}</span>}
            {status === "loading" ? <span className='capitalize text-right w-100'>loading...</span> :
                <>
                    {
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
                        })
                    }
                </>

            }
        </div>
    )
}

export default MyBlogs
