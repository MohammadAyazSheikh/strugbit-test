import styles from './page.module.css'
import Customers from './pages/customers/customers';

export default function Home() {
  return (
    <main className={styles.main}>
      <Customers />
    </main>
  )
}
