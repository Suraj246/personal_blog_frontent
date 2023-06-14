'use client'
import React, { useEffect, useState } from 'react'
import style from './home.module.scss'
import Search from './Search';

import { useDispatch, useSelector } from 'react-redux'
import { allBlogApi } from '@/app/redux/actions/blogActions'
import Image from 'next/image';
import Link from 'next/link';
import SkeletonBlog from './SkeletonBlog';
import { api } from '@/app/apiEndpoint';


const HomeBlogs = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const allBlogs = useSelector(state => state.allBlogs)
    const { allPosts, loading, error } = allBlogs
    const [blog, setBlog] = useState([])
    // const blogs = allPosts?.map((item) => item?.blogs)

    const postsArray = []
    const b = allPosts?.map((item) => item?.blogs?.map((elem) => postsArray.push(elem)))

    useEffect(() => {
        dispatch(allBlogApi())
    }, [])


    const filterItem = (item) => {
        const a = postsArray?.filter((elem) => item === elem?.category ? elem : null)
        setBlog(a)
    }
    console.log(allBlogs)
    return (
        <div className={style.blog_page}>
            <Search input={input} setInput={setInput} />
            <div className="flex justify-center gap-3 p-5 ">
                <button onClick={() => filterItem("")} className="bg-blue-700 text-white text-lg p-2 cursor-pointer uppercase">All</button>
                <button onClick={() => filterItem("lifestyle")} className="bg-blue-700 text-white text-lg p-2 uppercase">Lifestyle</button>
                <button onClick={() => filterItem("history")} className="bg-blue-700 text-white text-lg p-2 cursor-pointer uppercase">History</button>
                <button onClick={() => filterItem("technology")} className="bg-blue-700 text-white text-lg p-2 cursor-pointer uppercase">Technology</button>
            </div>
            <div className={style.blog_page_container}>
                {blog?.length === 0 ?

                    <>
                        {loading ? <SkeletonBlog cards={6} /> : error ? <span className='text-2xl capitalize text-center'>{error}</span> :

                            <>
                                {postsArray?.filter((elem) => {
                                    if (input === elem?.title) {
                                        return elem;
                                    } else if (elem?.title.toLowerCase().includes(input)) {
                                        return elem;
                                    }
                                    else {
                                        return false;
                                    }
                                })
                                    .map((item, id) => {
                                        return (
                                            <Link href={`/blog/${item?._id}`} className={style.link_blog} key={id}>
                                                <div className={style.img_container}>
                                                    <Image src={`${api}/uploads/${item?.image}`} className={style.img} alt={item?.title} width={100} height={100} />
                                                </div>
                                                <div className={style.title_container}>
                                                    <span className={style.category}>{item?.category}</span>
                                                    <span className={style.title}>{item?.title}</span>
                                                    <div dangerouslySetInnerHTML={{ __html: item?.content.slice(0, 200) }}
                                                        className={style.content}
                                                    />...
                                                </div>
                                            </Link>
                                        )
                                    })}
                            </>
                        }
                    </>

                    :

                    <>
                        {loading ? <SkeletonBlog cards={6} /> : error ? <span className='text-2xl capitalize text-center'>{error}</span> :
                            <>
                                {blog?.map((item, id) => {
                                    return (
                                        <Link href={`/blog/${item?._id}`} className={style.link_blog} key={id}>
                                            <div className={style.img_container}>
                                                <Image src={`${api}/uploads/${item?.image}`} className={style.img} alt={item?.title} width={100} height={100} />
                                            </div>
                                            <div className={style.title_container}>
                                                <span className={style.title}>{item?.title}</span>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </>
                        }

                    </>

                }
            </div>
        </div>
    )
}

export default HomeBlogs
