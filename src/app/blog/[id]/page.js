'use client'
import React, { useEffect } from 'react'
import style from './blogScreen.module.scss'
import { api } from '@/app/apiEndpoint'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { allBlogApi, singleBlogDetails } from '@/app/redux/actions/blogActions';
import Comment from './Comment';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import SkeRecentBlog from './SkeRecentBlog'

const page = ({ params }) => {
    const id = params.id

    const dispatch = useDispatch()
    const blogDetail = useSelector(state => state.singleBlog)
    const { blogDetails, error } = blogDetail

    const allBlogs = useSelector(state => state.allBlogs)
    const { allPosts, loading } = allBlogs
    const blogs = allPosts?.map((item) => item?.blogs)
    const resentPosts = blogs?.map((elem) => elem?.filter((item) => item._id !== id ? item : null))

    useEffect(() => {
        dispatch(allBlogApi())
    }, [])



    useEffect(() => {
        dispatch(singleBlogDetails(id))
    }, [id, dispatch])




    return (
        <div className={style.blog_screen_page}>
            <div className={style.middle_container}>
                <div className={style.blog_left}>
                    {error ? <span>{error}</span> :
                        <div className={style.blog_container}>
                            <span className={style.title}>{blogDetails?.title || <Skeleton count={2} />}</span>
                            {
                                blogDetails?.image ?
                                    <Image src={`${api}/uploads/${blogDetails?.image}`} alt={blogDetails?.title} width={900} height={900} />
                                    :
                                    <Skeleton width={900} height={500} />

                            }
                            <div dangerouslySetInnerHTML={{ __html: blogDetails?.content } || { __html: <Skeleton count={10} /> }}
                                className={style.content}
                            />

                        </div>
                    }
                    <Comment blogDetails={blogDetails} />
                </div>
                <div className={style.blog_right}>

                    <div className={style.blog_background}>
                        <h2 className="font-semibold">Recent Posts</h2>
                        {
                            loading ? <SkeRecentBlog cards={5} /> :
                                <>
                                    {resentPosts?.map((blog, id) => {
                                        return (
                                            <div key={id} className={style.inside_div}>
                                                {blog?.map((item, idx) => {
                                                    return (
                                                        <Link href={`/blog/${item._id}`} className={style.post_container} key={idx}>
                                                            <div>
                                                                <Image src={`${api}/uploads/${item?.image}` || <Skeleton />} width={100} height={100} alt={item?.title} />
                                                            </div>
                                                            <div>
                                                                <span>{item?.title || <Skeleton />}</span>
                                                            </div>
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
