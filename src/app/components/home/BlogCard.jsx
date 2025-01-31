"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import style from './home.module.scss'
import Image from 'next/image'
import { api } from '@/app/apiEndpoint'
const BlogCard = ({ item }) => {
    // i am storing image path in state because i want to change src path when real image fails to load 
    // in nextjs src cannot be modified directly
    const [imgSrc, setImgSrc] = useState(`${api}/uploads/${item?.image}`);
    return (
        <Link href={`/blog/${item?._id}`} className={style.link_blog} >
            <div className={style.img_container}>
                <Image src={imgSrc} className={style.img} alt={item?.title} width={700} height={300}
                    onError={() => setImgSrc('/image_not_found.webp')}
                />

            </div>
            <div className={style.title_container}>
                <span className='capitalize'>{item?.category}</span>
                <span className={style.title}>{item?.title}</span>
                <div dangerouslySetInnerHTML={{ __html: item?.content.slice(0, 100) }}
                    className={style.content}
                />...
            </div>
        </Link>
    )
}

export default BlogCard
