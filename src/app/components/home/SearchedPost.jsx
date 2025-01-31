"use client"

import { api } from '@/app/apiEndpoint'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import style from './home.module.scss'

const SearchedPost = ({ item }) => {
    const [imgSrc, setImgSrc] = useState(`${api}/uploads/${item?.image}`);

    return (
        <div>
            <Link href={`/blog/${item?._id}`} className={style.link_blog} key={id}>
                <div className={style.img_container}>
                    <Image src={imgSrc} className={style.img} alt={item?.title} width={700} height={100}
                        onError={() => setImgSrc('/image_not_found.webp')}
                    />
                </div>
                <div className={style.title_container}>
                    <span className={style.category}>{item?.category}</span>
                    <span className={style.title}>{item?.title}</span>
                    <div dangerouslySetInnerHTML={{ __html: item?.content.slice(0, 100) }}
                        className={style.content}
                    />...
                </div>
            </Link>
        </div>
    )
}

export default SearchedPost
