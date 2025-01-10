"use client"
import React, { useEffect, useState } from 'react'
import style from './blogScreen.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentApi, addCommentToCurrentBlogApi } from '@/app/redux/slices/singleBlogSlice'

const Comment = ({ blogDetails }) => {
    const dispatch = useDispatch()
    const commentData = useSelector(state => state.singleBlog)
    const { commentsData } = commentData

    const [title, setTitle] = useState('')

    if (typeof window !== "undefined") {

        var commentId = localStorage.getItem('newCommentId') ? localStorage.getItem('newCommentId') : null
    }
    useEffect(() => {
        dispatch(addCommentToCurrentBlogApi({ blogId: blogDetails?._id, commentId: commentId }))
        setTimeout(() => {
            localStorage.removeItem("newCommentId")
        }, 5000)
    }, [dispatch, blogDetails?._id, commentsData?.newPost?._id, blogDetails])

    const addComment = async (e) => {
        e.preventDefault()
        if (!title) {
            alert('comment is empty')
            return false
        }

        dispatch(addCommentApi(title))
        setTitle("")
    }

    return (
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
                {blogDetails?.comments?.map((elem, idx) => {
                    return (
                        <div className={style.comment_container} key={idx}>
                            <span className={style.comment}>{elem?.title}</span>
                            <span>{elem?.createdAt.slice(0, 10)}</span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Comment
