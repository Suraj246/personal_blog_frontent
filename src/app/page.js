import styles from './page.module.css'
import HomeBlogs from './components/home/HomeBlogs'

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeBlogs />
    </main>
  )
}
