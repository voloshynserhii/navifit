'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Backdrop, Box, Fade, Typography, Button, Modal } from '@mui/material'
import { useAppStore } from '../../store'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', md: '70%', lg: '50%' },
  borderRadius: '1rem',
  bgcolor: 'rgba(var(--background-rgb))',
  boxShadow: 24,
  p: 4,
}

const Checkout = () => {
  const router = useRouter()
  const [state, dispatch] = useAppStore();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  
  useEffect(() => {
    if (!Object.keys(state.userData).length || !state.userData) router.push('/');
  }, [state.userData])
  
  const paymentHandler = () => {
    dispatch({
      type: 'CURRENT_USER',
      payload: state.userData,
    });
    
    router.push('/signup', { scroll: false });
  }
  
  return (
    <main>
      {paymentModalOpen && (
        <Modal 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        open={paymentModalOpen}>
          <Fade in>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h3" sx={{ mb: 2 }}>
                Payment Modal
              </Typography>
              <Button onClick={paymentHandler}>Pay</Button>
            </Box>
          </Fade>
        </Modal>
      )}
      <Typography>Wybierz swój plan</Typography>
      list of plans
      1 month
      3 months
      6 months
      <Button onClick={() => setPaymentModalOpen(true)}>Odbierz swój plan</Button>
      open payment modal
    </main>
  );
};

export default Checkout;