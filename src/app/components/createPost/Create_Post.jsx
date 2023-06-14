'use client'
import React, { useState, useEffect } from 'react'
import style from './createPost.module.scss'
import axios from 'axios'
import CreatePostForm from './CreatePostForm'
import { api } from '@/app/apiEndpoint'
import { useDispatch, useSelector } from 'react-redux'
import { createBlogApi } from '@/app/redux/actions/blogActions'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const Create_Post = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const createdBlogs = useSelector(state => state.newCreateBlog)
    const { loading, error } = createdBlogs
    const updateBlogDataRequest = useSelector(state => state.updateBlogData)
    const { userBlogData } = updateBlogDataRequest

    const [input, setInput] = useState({
        title: userBlogData?.title || ""
    })
    const [content, setContent] = useState(userBlogData?.content || "");
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    console.log(category)



    const inputHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value })
    }


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

        dispatch(createBlogApi(formData))
        setInput({ title: "" })
        setImage("")
        setContent("")
        // router.push('/')
        // window.location.reload()
    };

    const blogId = localStorage.getItem('blogId') ? localStorage.getItem('blogId') : ''
    const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : []
    var userId = userData?.userId

    useEffect(() => {
        axios.post(`${api}/user/blog/store-post-to-each-user`, {
            userId, blogId
        })
            .then((res) => { return res })
            .catch((err) => { return err })
    }, [userId, blogId]);

    return (
        <div className={style.create_blog_page}>
            <span className={style.create_blog_title}>Create Blog </span>
            {error && <span className="">{error}</span>}
            <CreatePostForm userBlogData={userBlogData}
                input={input}
                setInput={setInput}
                value={content}
                setValue={setContent}
                inputHandler={inputHandler}
                handleSubmit={handleSubmit}
                setImage={setImage}
                loading={loading}
                category={category}
                setCategory={setCategory}
            />

        </div>
    )
}

export default Create_Post
