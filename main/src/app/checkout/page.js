'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Backdrop, Box, Card, CardContent, CircularProgress, Fade, TextField, Typography, Button, Modal, Stack } from '@mui/material'
import { useAppStore } from '../../store'
import api from '../../utils/api'

const publicKey = process.env.tPayPublicKey

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', md: 450 },
  borderRadius: '1rem',
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
}

const Checkout = () => {
  const router = useRouter()
  const [state, dispatch] = useAppStore();
  const [chosenPlan, setChosenPlan] = useState(undefined)
  const [plans, setPlans] = useState([])

  // useEffect(() => {
  //   if (!Object.keys(state.userData).length || !state.userData) router.push('/');
  // }, [state.userData])

  useEffect(() => {
    api.plan.getPlans({ limit: 10 }).then(({ data }) => {
      if (data.length) setPlans(data)
    })
  }, [])

  const paymentHandler = async () => {
    // const { data } = await api.payment.auth()
    // const { access_token } = data || {}

    router.push('https://secure.sandbox.tpay.com/?kwota=39.99&crc=order_1&return_url=https://navifit.vercel.app/signup?email=test@navifit.com&online=1&opis=test&opis_sprzed=navifit&wyn_email=vosquery%40gmail.com&jezyk=PL&id=400580&md5sum=193475330af9031a5e43303c3d152879')
    // if (access_token) {
    //   const response = await api.payment.createTransaction({ access_token, cardDetails, chosenPlan })
      
    //   if (response.transactionPaymentUrl) {
    //     dispatch({
    //       type: 'CURRENT_USER',
    //       payload: state.userData,
    //     });
        
    //     router.push(`${response.transactionPaymentUrl}`, { scroll: false });
    //   }
    // }
  }

  return (
    <main>
      {chosenPlan && (
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
          onClose={() => setChosenPlan(undefined)}
          open={!!chosenPlan}>
          <Fade in>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h3" sx={{ mb: 2 }}>
                Payment Modal
              </Typography>
              <Stack gap={2}>
                {/* <TextField
                  value={cardDetails.cardOwner || ''}
                  multiline
                  label="Name on Card"
                  name="cardOwner"
                  variant="outlined"
                  fullWidth
                  onChange={e => setCardDetails(prev => ({ ...prev, cardOwner: e.target.value }))}
                /> */}
                <Button onClick={paymentHandler}>{`Pay ${chosenPlan.price} zl`}</Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      )}

      {!plans.length ? <CircularProgress color="inherit" /> : (
        <Typography>Wybierz swój plan</Typography>
      )}

      {!!plans.length && plans.sort((a, b) => a.duration - b.duration).map((plan) => (
        <Card key={plan._id} sx={{ width: '40%', m: 2 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="secondary.black" gutterBottom>
              {plan.duration} months
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="secondary.black" gutterBottom>
              {plan.price} zl <span style={{ textDecoration: 'line-through' }}>{plan.promoPrice} zl</span>
            </Typography>
            <Button onClick={() => setChosenPlan(plan)}>Choose</Button>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default Checkout;