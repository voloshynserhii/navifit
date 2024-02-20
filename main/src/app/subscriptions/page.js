'use client'
import { useRouter } from 'next/navigation'
import { Typography, Button } from '@mui/material'

const Subscriptions = () => {
  const router = useRouter()
  
  return (
    <main>
      <Typography>Odbierz swój spersonalizowany plan</Typography>
      <Button onClick={() => router.push('/checkout', { scroll: false })}>Odbierz swój plan</Button>
    </main>
  );
};

export default Subscriptions;