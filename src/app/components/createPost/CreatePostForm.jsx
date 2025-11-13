'use client'
import React, { useState } from 'react'
import style from './createPost.module.scss'
import dynamic from 'next/dynamic';
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.snow.css";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateSingleBlogsApi } from '@/app/redux/slices/blogFormSlice';

const ReactQuill = dynamic(
    () => {
        return import('react-quill');
    },
    { ssr: false }
);


const CreatePostForm = ({ category, setCategory, updateBlogDetails, setInput, input, value, setValue, inputHandler, handleSubmit, setImage, status }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)
    const unique = ["react", "nextjs", "nodejs", "css"]

    const saveUpdateBlog = () => {
        const { title } = input

        // const formData = new FormData()

        // formData.append("title", title)
        // formData.append("image", image)
        // formData.append("content", value)
        // console.log(formData)

        dispatch(updateSingleBlogsApi({ id: updateBlogDetails?._id, title, value }))
        setInput({ title: "" })
        setValue("")
        router.push("/")
        // window.location.reload()
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
            ['clean'],

        ],

    }


    return (
        <div className="flex flex-col gap-6">
            <label className="text-gray-800">Blog Title</label>

            <input type="text" name="title"
                value={input.title}
                placeholder='Title'
                onChange={inputHandler}
                className='border'
            />


            <div className={style.dropdown_container}>
                <label className="text-gray-800">Blog Category</label>

                <div className={style.dropdown} onClick={() => setIsActive(!isActive)}>
                    {category ?
                        <>
                            <div className={style.dropdown_btn} >{category}</div>
                            {/* <i className='bx bx-chevron-down arrow-city'></i> */}
                        </>

                        :
                        <>
                            <span className="se">Select Blog Category</span>
                            {/* <i className='bx bx-chevron-down arrow-city'></i> */}
                        </>

                    }
                    {isActive &&
                        <div className={style.dropdown_content}>

                            {unique.map((option, idx) => {
                                return (
                                    <div className={style.dropdown_item}
                                        key={idx}
                                        onClick={e => {
                                            setCategory(option)
                                            setIsActive(false)
                                        }}
                                    >
                                        {option}
                                    </div>
                                )
                            })}

                        </div>
                    }
                </div>

            </div>



            <input type="file" name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className='
                block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                '
            />

            <ReactQuill theme="snow" value={value} onChange={setValue}
                modules={modules} className={style.editor}
            />

            <br />
            <br />
            <br />
            {
                updateBlogDetails?._id ?
                    <button className="bg-indigo-500 p-2 text-white"
                        onClick={saveUpdateBlog}
                    >
                        Update
                    </button>

                    :
                    <>
                        {
                            status === "success" ?
                                <button className="bg-indigo-500 p-2 text-white"
                                    onClick={handleSubmit}
                                >
                                    creating...
                                </button> :
                                <button className="bg-indigo-500 p-2 text-white"
                                    onClick={handleSubmit}
                                >
                                    create
                                </button>
                        }
                    </>
            }
        </div>

    )
}


export default CreatePostForm
