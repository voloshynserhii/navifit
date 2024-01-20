'use client';
// import { useRouter } from "next/navigation";
import styles from './page.module.css'

export default function NotFound() {
  // const router = useRouter();
  return (
    <main className={styles.main}>
      <section>
        <div>
          <h1>
            Opps... Looks like you have been lost.
          </h1>
          <h1>
            4 0 4
          </h1>
        </div>
      </section>
    </main>
  );
}