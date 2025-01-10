'use client'
import React, { useState, useRef, useEffect } from 'react'
import style from "./header.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from "js-cookie"
import { useSelector } from 'react-redux';

const Header = () => {
    const selector = useSelector(state => state.currentUser)
    const { user } = selector

    const router = useRouter()
    const [dropdown, setDropdown] = useState(false)
    const [userName, setUserName] = useState('')

    const menuRef = useRef()
    const imgRef = useRef()


    // Added to the window to close the dropdown if a click occurs outside the referenced elements (menuRef and imgRef).
    if (typeof window !== "undefined") {
        window.addEventListener("click", (e) => {
            if (e.target !== menuRef.current && e.target !== imgRef.current) {
                setDropdown(false)
            }
        })
    }

    // const updateUserData = () => {
    //     if (typeof window !== "undefined") {

    //         var userData = localStorage.getItem('blog_user') ? JSON.parse(localStorage.getItem('blog_user')) : null
    //     }
    //     setUserName(userData?.username)
    // };

    useEffect(() => {
        const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : []

        // updateUserData()
        setUserName(userData?.username)

    }, [user])
    return (
        <header className={style.header}>

            <div className='flex justify-around w-full'>
                <Link href='/' className=" text-2xl md:text-3xl font-bold uppercase italic">
                    my Blog
                </Link>

                <div className={style.user_container}>
                    {!userName ?
                        <span className={style.login}>
                            <Link href='/login' className='text-black underline'>LogIn</Link>
                        </span>
                        :
                        <>
                            <div className={style.profile_container}>
                                <button className="text-1xl font-semibold uppercase pt-1 pb-1 pr-6 pl-6 border border-green-400 rounded-lg " ref={imgRef} onClick={() => setDropdown(!dropdown)}>{userName || user?.username}</button>
                            </div>
                            {dropdown &&
                                <div className={style.dropdown_container}>
                                    <Link href='/create-post' className="text-black text-sm cursor-pointer capitalize hover:underline">Create Blog</Link>
                                    <Link href='/yourblogs' className="text-black text-sm cursor-pointer capitalize hover:underline">Your Blogs</Link>
                                    <span className="text-red-400 text-sm cursor-pointer capitalize hover:underline"
                                        onClick={() => {
                                            localStorage.clear();
                                            router.push('/')
                                            Cookies.remove('user')
                                            window.location.reload()
                                        }}
                                    >logout</span>
                                </div>
                            }
                        </>
                    }

                </div>
            </div>
        </header>
    )
}

export default Header
