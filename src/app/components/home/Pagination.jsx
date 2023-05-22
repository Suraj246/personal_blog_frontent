import style from './home.module.scss'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            {pageNumbers.map((num) => {
                return (
                    <button href="#" onClick={() => paginate(num)} className={style.num} key={num}>{num}</button>
                )
            })}

        </div>
    )
}

export default Pagination
