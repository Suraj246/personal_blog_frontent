'use client'
import React, { useState, useEffect } from 'react'
import style from './createPost.module.scss'
import axios from 'axios'
import CreatePostForm from './CreatePostForm'
import { api } from '@/app/apiEndpoint'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { createBlogApi } from '@/app/redux/slices/blogFormSlice'

const Create_Post = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const createdBlogs = useSelector(state => state.newCreateBlog)
    const { status, createdBlog, error } = createdBlogs
    // console.log("createdBlog", createdBlog?.newPost?._id)

    // receiving update blog details
    const updateBlogDataRequest = useSelector(state => state.currentUserBlogs)
    const { updateBlogDetails } = updateBlogDataRequest

    const [input, setInput] = useState({
        title: updateBlogDetails?.title || ""
    })
    const [content, setContent] = useState(updateBlogDetails?.content || "");
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')



    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }


    // if (typeof window !== "undefined") {

    //     var blogId = localStorage.getItem('blogId') ? localStorage.getItem('blogId') : createdBlog?.newPost?._id
    // }


    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : []
    var userId = userData?.userId

    // crating blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title } = input

        const formData = new FormData()
        formData.append("title", title)
        formData.append("image", image)
        formData.append("content", content)
        formData.append("category", category)
        if (!title || !content) {
            alert("empty fields")
            return
        }

        dispatch(createBlogApi({ formData }))
            .then((res) => {
                // console.log("success", res?.payload?.newPost?._id);
                const blogId = res?.payload?.newPost?._id
                if (res) {
                    axios.post(`${api}/user/blog/store-post-to-each-user`, {
                        userId, blogId
                    })
                        .then((res) => { console.log(res); })
                        .catch((err) => { return err })

                }
            })
        setInput({ title: "" })
        setImage("")
        setContent("")

        router.push('/')
        // window.location.reload()
    };



    // storing post to the current user
    // useEffect(() => {
    //     axios.post(`${api}/user/blog/store-post-to-each-user`, {
    //         userId, blogId
    //     })
    //         .then((res) => { console.log(res); })
    //         .catch((err) => { return err })
    // }, [userId, blogId]);

    return (
        <div className={style.create_blog_page}>
            <span className={style.create_blog_title}>Create Blog </span>
            {error && <span className="">{error}</span>}
            <CreatePostForm updateBlogDetails={updateBlogDetails}
                input={input}
                setInput={setInput}
                value={content}
                setValue={setContent}
                inputHandler={inputHandler}
                handleSubmit={handleSubmit}
                setImage={setImage}
                status={status}
                category={category}
                setCategory={setCategory}
            />

        </div>
    )
}

export default Create_Post
