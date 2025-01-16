'use client'
import React, { useEffect, useState } from 'react'
import style from './home.module.scss'
import Search from './Search';

import { useDispatch, useSelector } from 'react-redux'
import { allBlogApi } from '../../redux/slices/postsSlice'
import Image from 'next/image';
import Link from 'next/link';
import SkeletonBlog from './SkeletonBlog';
import { api } from '@/app/apiEndpoint';


const HomeBlogs = () => {
    const [input, setInput] = useState('')

    const dispatch = useDispatch()

    const allBlogs = useSelector(state => state.allBlogs)
    const { allPosts, status, error } = allBlogs
    const [blog, setBlog] = useState([])

    const postsArray = []
    const b = allPosts?.map((item) => item?.blogs?.map((elem) => postsArray.push(elem)))

    useEffect(() => {
        dispatch(allBlogApi())
    }, [])


    // storing searched post in blog state
    const filterItem = (item) => {
        const a = postsArray?.filter((elem) => item === elem?.category ? elem : null)
        setBlog(a)
    }
    return (
        <div className={style.blog_page}>
            <Search input={input} setInput={setInput} />
            <div className="flex justify-center gap-3 p-5 ">
                <button onClick={() => filterItem("")} className="bg-blue-700 rounded-lg text-white text-sm px-2 cursor-pointer uppercase">All</button>
                <button onClick={() => filterItem("react")} className="bg-blue-700 rounded-lg text-white text-sm px-2 cursor-pointer uppercase">react</button>
                <button onClick={() => filterItem("nextjs")} className="bg-blue-700 rounded-lg text-white text-sm px-2 cursor-pointer uppercase">nextjs</button>
                <button onClick={() => filterItem("nodejs")} className="bg-blue-700 rounded-lg text-white text-sm px-2 py-2 cursor-pointer uppercase">nodejs</button>
                <button onClick={() => filterItem("css")} className="bg-blue-700 rounded-lg text-white text-sm px-2 py-2 cursor-pointer uppercase">css</button>
            </div>
            <div className={style.blog_page_container}>
                {blog?.length === 0 ?

                    // displaying all posts
                    <>
                        {status === "loading" ? <SkeletonBlog cards={3} /> : error ? <span className='text-2xl capitalize text-center'>{error}</span> :

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
                                        console.log(`${api}/uploads/${item?.image}`)
                                        return (
                                            <Link href={`/blog/${item?._id}`} className={style.link_blog} key={id}>
                                                <div className={style.img_container}>
                                                    <Image src={`${api}/uploads/${item?.image}`} className={style.img} alt={item?.title} width={700} height={300}
                                                    />

                                                </div>
                                                <div className={style.title_container}>
                                                    <span className={style.category}>{item?.category}</span>
                                                    <span className={style.title}>{item?.title}</span>
                                                    <div dangerouslySetInnerHTML={{ __html: item?.content.slice(0, 100) }}
                                                        className={style.content}
                                                    />...
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </>
                        }
                    </>

                    :
                    // displaying searched post only
                    <>
                        {blog?.map((item, id) => {
                            return (
                                <Link href={`/blog/${item?._id}`} className={style.link_blog} key={id}>
                                    <div className={style.img_container}>
                                        <Image src={`${api}/uploads/${item?.image}`} className={style.img} alt={item?.title} width={700} height={100} />
                                    </div>
                                    <div className={style.title_container}>
                                        <span className={style.category}>{item?.category}</span>
                                        <span className={style.title}>{item?.title}</span>
                                        <div dangerouslySetInnerHTML={{ __html: item?.content.slice(0, 100) }}
                                            className={style.content}
                                        />...
                                    </div>
                                </Link>
                            )
                        })}

                    </>

                }
            </div>
        </div>
    )
}

export default HomeBlogs
