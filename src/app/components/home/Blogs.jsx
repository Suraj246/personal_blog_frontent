import React from 'react'
import Link from 'next/link';
import style from './home.module.scss'
import { api } from '@/app/apiEndpoint'

const Blogs = ({ item }) => {

    return (
        <div className={style.blog_container_admin}>
            <Link href={`/blog/${item._id}`} className={style.a}>
                <div className={style.title_container}>
                    <div>
                        <img src={`${api}/uploads/${item?.image}`} alt={item?.title} loading='lazy' />
                        <span className={style.title}>{item?.title}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Blogs
