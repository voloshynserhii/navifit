'use client'
import { Stack, Container, Grid, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import Button from './components/Button'
import Checkbox from './components/Checkbox'
import styles from './index.module.css'
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  height: 345,
  backgroundColor: 'rgba(var(--cardBackground-rgb))',
  borderRadius: theme.spacing(3),
  border: '1px solid rgba(var(--cardBorder-rgb))',
  cursor: 'pointer',
  '&:hover': {
    border: '1px solid rgba(var(--foreground-rgb))',
  },
}));

export default function Main({ onChooseOption }) {
  return (
    <Container>
      <div className={styles.title}>
        <Typography variant="h1">
          Czy chcesz schudnąć? <span className='coloredTitle'>My Fit Plan</span>
        </Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DemoPaper>
            <Image
              src="/TakImage.png"
              width={500}
              height={343}
              alt="Tak"
            />
            <Button title='Tak' onClick={() => onChooseOption('tak')} />
          </DemoPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <DemoPaper>
            <Image
              src="/NieImage.png"
              width={500}
              height={343}
              alt="Nie"
            />
            <Button title='Nie' onClick={() => onChooseOption('nie')}/>
          </DemoPaper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" alignItems='flex-start'>
            <Checkbox onGetChecked={(checked) => console.log('Agree', checked)} />
            <Typography variant='h5' sx={{ fontWeight: 100, fontSize: '18px', letterSpacing: '1.5px' }}>
              Chciałbym otrzymywać informacje o produktach, usługach i ofertach specjalnych od Myfitplan za pośrednictwem poczty elektronicznej
            </Typography>
          </Stack>

        </Grid>
      </Grid>
    </Container>
  )
}