'use client'
import { useRouter } from 'next/navigation'
import { Typography, Button } from '@mui/material'
import { useAppStore } from '../../store';

const Subscriptions = () => {
  const router = useRouter()
  const [state] = useAppStore();
  console.log(state.userData)

  return (
    <main>
      <Typography>Odbierz swój spersonalizowany plan</Typography>
      <span>{state.userData.email}</span>
      <Button onClick={() => router.push('/checkout')}>Odbierz swój plan</Button>
      Twoje podsumowanie
      display BMI, 
      water,
      kCal
    </main>
  );
};

export default Subscriptions;