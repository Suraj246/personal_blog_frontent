import React from 'react'
import Skeleton from 'react-loading-skeleton'
import style from './home.module.scss'

const SkeletonBlog = ({ cards }) => {
    return (
        <div className={style.skeleton_card_container}>
            {
                Array(cards).fill(0).map((_, idx) => {
                    return (
                        <div className={style.skeleton_card} key={idx}>
                            <div className={style.skeleton_img}>
                                <Skeleton width={370} height={230} />
                            </div>
                            <div className={style.skeleton_title}>
                                <Skeleton width={100} />
                                <Skeleton width={370} count={2} />
                                <Skeleton width={100} />
                                <Skeleton width={370} count={2} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SkeletonBlog
