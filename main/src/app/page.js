import { Container, Typography } from '@mui/material'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.title}>
          <Typography variant="h1">
            Czy chcesz schudnąć? <span className='coloredTitle'>My Fit Plan</span>
          </Typography>
        </div>
      </Container>
    </main>
  )
}
