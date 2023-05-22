'use client'
import React, { useEffect, useState, useContext } from 'react'
import { useAppContext } from '@/app/context/Context'
import axios from 'axios'
import style from './blogScreen.module.scss'
import Loading from '@/app/Loading';
import { api } from '@/app/apiEndpoint'

export const metadata = {
    title: 'Blog',
}

const page = ({ params }) => {
    const id = params.id
    const [title, setTitle] = useState('')
    const [blog, setBlog] = useState([])

    const context = useAppContext()
    const { theme } = context


    useEffect(() => {
        axios.get(`${api}/${id}`)
            .then((res) => {
                setBlog(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [blog, id])

    useEffect(() => {
        const commentId = localStorage.getItem('commentId')
        axios.post(`${api}/store-comment-to-each-blog`, { blogId: id, commentId: commentId })
            .then((response) => {
                return response
                // window.location.reload()
            })
            .catch((err) => console.log(err))
    }, [blog, id])

    const addComment = async (e) => {
        e.preventDefault()
        if (!title) {
            alert('comment is empty')
            return false
        }
        await axios.post(`${api}/create-comment`, { title })
            .then((response) => {
                localStorage.setItem("commentId", response.data.newPost._id)
                setTitle('')
                setTimeout(() => {
                    localStorage.removeItem('commentId')
                }, 2000)
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className={theme === 'light' ? `${style.blog_screen_page}` : `${style.light} ${style.blog_screen_page}`}>
            {blog?.length === 0 ? <Loading /> :
                <div className={style.blog_container}>
                    <span className={style.title}>{blog?.title}</span>
                    <img src={`${api}/uploads/${blog?.image}`} alt={blog?.title} loading='lazy' />
                    {/* <span className={style.content}>{blog?.content}</span> */}
                    <div dangerouslySetInnerHTML={{ __html: blog?.content }}
                        className={style.content}
                    />
                </div>
            }
            <section className={style.comments_container}>
                <h6 className={style.title}>Comment Section</h6>
                <form onSubmit={addComment}>
                    <input type="text" name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="let me know what you think about this blog"
                    />
                    <input type="button" value="ADD" className={style.btn}
                        onClick={addComment}
                    />
                </form>

                <div className={style.comment_section}>
                    {blog?.comments?.map((elem, id) => {
                        return (
                            <div className={style.comment_container} key={id}>
                                <span className={style.comment}>{elem?.title}</span>
                                <span>{elem?.createdAt.slice(0, 10)}</span>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default page
