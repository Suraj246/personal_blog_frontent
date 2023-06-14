import React from 'react'
import style from './blogScreen.module.scss'
import Skeleton from 'react-loading-skeleton'

const SkeRecentBlog = ({ cards }) => {
    return (
        Array(cards).fill(0).map((item, idx) => {
            return (
                <div className={style.ske_post_container}>
                    <div>
                        <Skeleton width={100} height={80} />
                    </div>
                    <div>
                        <Skeleton count={3} />
                    </div>
                </div>
            )
        })
    )
}

export default SkeRecentBlog
