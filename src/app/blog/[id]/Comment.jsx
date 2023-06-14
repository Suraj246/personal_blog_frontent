"use client"
import React, { useEffect, useState } from 'react'
import style from './blogScreen.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentApi, addCommentToCurrentApi } from '@/app/redux/actions/commentActions'

const Comment = ({ blogDetails }) => {

    const dispatch = useDispatch()
    const commentData = useSelector(state => state.comments)

    const [title, setTitle] = useState('')
    const [refresh, setRefresh] = useState(false)


    // const commentId = localStorage.getItem('commentId')
    useEffect(() => {
        dispatch(addCommentToCurrentApi(blogDetails?._id, commentData?.comment?.newPost?._id))
    }, [dispatch, blogDetails?._id, commentData?.comment?.newPost?._id, refresh])

    const addComment = async (e) => {
        e.preventDefault()
        if (!title) {
            alert('comment is empty')
            return false
        }

        dispatch(addCommentApi(title))
        setRefresh(!refresh)
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
