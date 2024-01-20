'use client';

import { CircularProgress } from '@mui/material';
import styles from './page.module.css'

export default function Loading() {
  return (
    <main className={styles.main}>
        <CircularProgress color="inherit"  />
    </main>
  );
}