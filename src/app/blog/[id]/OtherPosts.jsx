import { api } from '@/app/apiEndpoint'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import style from './blogScreen.module.scss'

const OtherPosts = ({ item }) => {
  const [imgSrc, setImgSrc] = useState(`${api}/uploads/${item?.image}`);

  return (
    <Link href={`/blog/${item._id}`} className={style.post_container} >
      <div className={style.other_post_img}>
        <Image src={imgSrc || <Skeleton />} width={500} height={700} alt={item?.title}
          onError={() => setImgSrc('/image_not_found.webp')}
        />
      </div>
      <div className='w-3/4'>
        <span>{item?.title || <Skeleton />}</span>
      </div>
    </Link>
  )
}

export default OtherPosts
