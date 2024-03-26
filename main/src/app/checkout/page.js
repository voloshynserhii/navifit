'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Backdrop, Box, Card, CardContent, CircularProgress, Fade, Typography, Button, Modal } from '@mui/material'
import { useAppStore } from '../../store'
import api from '../../utils/api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', md: '70%', lg: '50%' },
  borderRadius: '1rem',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
}

const Checkout = () => {
  const router = useRouter()
  const [state, dispatch] = useAppStore();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [plans, setPlans] = useState([])

  // useEffect(() => {
  //   if (!Object.keys(state.userData).length || !state.userData) router.push('/');
  // }, [state.userData])

  useEffect(() => {
    api.plan.getPlans(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 }).then(({ data }) => {
      if (data.length) setPlans(data)
    })
  }, [])

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
          onClose={() => setPaymentModalOpen(false)}
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

      {!plans.length ? <CircularProgress color="inherit" /> : (
        <Typography>Wybierz swój plan</Typography>
      )}

      {plans.length && plans.sort((a, b) => a.duration - b.duration).map(({ _id, price, promoPrice, duration }) => (
        <Card key={_id} sx={{ width: '40%' }} onClick={() => setPaymentModalOpen(true)}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="secondary.black" gutterBottom>
              {duration} months
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="secondary.black" gutterBottom>
              {price} zl <span style={{ textDecoration: 'line-through' }}>{promoPrice} zl</span>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default Checkout;