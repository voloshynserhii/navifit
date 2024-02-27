'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Typography, Button } from '@mui/material'
import { useAppStore } from '../../store';

const Subscriptions = () => {
  const router = useRouter()
  const [state] = useAppStore();
  const { userData: user = {}} = state;
  
  useEffect(() => {
    if (!Object.keys(user).length) router.push('/');
  }, [state.userData])

  return (
    <main>
      <Typography>Odbierz swój spersonalizowany plan</Typography>
      <span>{state.userData.email}</span>
      <Button onClick={() => router.push('/checkout')}>Odbierz swój plan</Button>
      Twoje podsumowanie
      <h3>YOUR BMI: {user.userData?.BMI}</h3>
      <h5>YOUR BMR: {user.userData?.BMR} kCal</h5>
      <h5>Average daily energy needed: {user.userData?.personalDailyKCalNeeded} kCal</h5>
      water,
      kCal
    </main>
  );
};

export default Subscriptions;