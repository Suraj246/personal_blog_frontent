'use client'
import React, { useState, useEffect } from 'react'
import style from './createPost.module.scss'
import axios from 'axios'
import CreatePostForm from './CreatePostForm'
import { api } from '@/app/apiEndpoint'

const Create_Post = () => {
    const [input, setInput] = useState({
        title: ""
    })
    const [content, setContent] = useState("");

    const [image, setImage] = useState('')



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
        if (!title || !content) {
            alert("empty fields")
            return
        }
        try {
            const { data } = await axios.post(`${api}/create-post`,
                formData,
            );
            if (data) {
                localStorage.setItem("blogId", data.newPost._id)
                window.location.reload()
                console.log(data)
            }
            else {
                return false;
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    useEffect(() => {
        const blogId = localStorage.getItem("blogId") || ''
        const userId = JSON.parse(localStorage.getItem("blog userData"))
        axios.post(`${api}/store-post-to-each-user`, {
            userId, blogId
        })
            .then((res) => { return res })
            .catch((err) => { return err })
    }, [])

    return (
        <div className={style.create_blog_page}>

            <span className={style.create_blog_title}>Create Blog </span>
            <CreatePostForm input={input} value={content} setValue={setContent} inputHandler={inputHandler} handleSubmit={handleSubmit} setImage={setImage} />
        </div>
    )
}

export default Create_Post
