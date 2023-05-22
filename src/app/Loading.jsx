import React from 'react'
import style from '@/app/loading.module.scss'
const loading = () => {
    return (
        <div className={style.loading}>
            <div className={style.lds}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default loading
