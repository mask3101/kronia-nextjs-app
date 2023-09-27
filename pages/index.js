import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Learn Next.js!
        </h1>

        
      </main>

    </div>
  )
}
