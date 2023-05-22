'use client'
import React from 'react'
import style from './createPost.module.scss'

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePostForm = ({ input, value, setValue, inputHandler, handleSubmit, setImage }) => {

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
        <form onSubmit={handleSubmit}>
            <input type="text" name="title"
                value={input.title}
                placeholder='Title'
                onChange={inputHandler}
            />
            <input type="file" name="image"
                onChange={(e) => setImage(e.target.files[0])}
            />

            <ReactQuill theme="snow" value={value} onChange={setValue}
                modules={modules} className={style.editor}
            />
            <br />
            <br />
            <br />

            <input type="button" value="Create" className={style.btn}
                onClick={handleSubmit}
            />
        </form>

    )
}

export default CreatePostForm
