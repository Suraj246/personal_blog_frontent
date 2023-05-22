"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from './yourblogs.module.scss'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Loading from '@/app/Loading';
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { api } from '@/app/apiEndpoint'
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(
    () => {
        return import('react-quill');
    },
    { ssr: false }
);
const YourBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [updatePost, setUpdatePost] = useState([])
    const [image, setImage] = useState('')
    const [value, setValue] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getBlogsData = async () => {
        const userId = JSON.parse(localStorage.getItem("blog userData"))
        try {
            const { data } = await axios.post(`${api}/get-user`, userId);
            if (data) {
                setBlogs(data.data.blogs)
            }
            else {
                return false;
            }
        } catch (ex) {
            // console.log(ex);
            return false;
        }
    };
    useEffect(() => {
        getBlogsData()
    }, [blogs])

    const handleChange = (e) => {
        const { name, value } = e.target

        setUpdatePost(prev => {
            return { ...prev, [name]: value }
        })
    }

    const updateBlog = async (idx) => {
        setUpdatePost(idx)
        handleShow()
        setValue(idx.content)
        // console.log(idx)
    }

    const saveUpdatePost = (e) => {
        console.log(updatePost)
        const formData = new FormData()
        formData.append("title", updatePost.title)
        formData.append("image", image)
        formData.append("content", value)
        axios.put(`${api}/update/${updatePost._id}`, formData)
            .then((res) => { return res })
            .catch((err) => { console.log(err) })
        handleClose()
    }
    const deleteBlog = async (idx) => {
        const userId = JSON.parse(localStorage.getItem("blog userData"))
        localStorage.removeItem("blogId")
        try {
            const { data } = await axios.delete(`${api}/${userId.userId}/${idx}`);
            if (data) {
                setBlogs(data.data.blogs)
            }
            else {
                return false;
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false,] }],
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video"],
            ['clean']
        ]
    }


    return (
        <div className={style.user_blogs_page}>

            {blogs.length === 0 ? <Loading /> : blogs.map((elem, idx) => {
                return (
                    <div className={style.user_blog_container} key={idx}>

                        <img src={`${api}/uploads/${elem?.image}`} alt={elem?.title} />
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
            })}

            <Modal show={show} onHide={handleClose}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title className=''>Update Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="Title">Title</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                        name="title"
                        value={updatePost.title}
                        onChange={handleChange}
                        className="mb-3"
                    />

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/* <Form.Label>Image</Form.Label> */}
                        <input type="file" name="image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>

                    <Form.Label htmlFor="content">Content</Form.Label>
                    {/* 
                    <textarea name="content" cols={102} rows={10}
                        value={updatePost.content}
                        onChange={handleChange}
                    /> */}

                    <ReactQuill theme="snow"
                        name="content"
                        value={value}
                        // onChange={setValue}
                        // onChange={(e) => setUpdatePost(e.target.value)}
                        onChange={setValue}

                        modules={modules}
                    />
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveUpdatePost}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default YourBlogs
