'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Backdrop, Box, Fade, Modal, TextField, Typography } from '@mui/material'
import api from '../../utils/api'
import Button from '../../containers/Steps/components/Button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  borderRadius: '1rem',
  bgcolor: 'rgba(var(--background-rgb))',
  boxShadow: 24,
  p: 4,
}

export default function TransitionsModal() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const sendEmailHandler = () => {
    // const data = {
    //   email,
    //   userData: answers
    // }
    
    // api.user.sendAnswers(process.env.NEXT_PUBLIC_DB_HOST, data).then(() => {
      router.push('/subscriptions', { scroll: false });
    // }).catch(() => router.push('/subscriptions'))
  }

  return (
    <main>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open
        onClose={() => router.push('/')}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h3" sx={{ mb: 2 }}>
              Wpisz swój adres e-mail, aby dowiedzieć się, jak schudnąć z Navifit
            </Typography>
            <TextField id="outlined-basic" label="E-mail" variant='filled' fullWidth sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Typography id="transition-modal-description" variant="h6" sx={{ mt: 2 }}>
              Navifit nie sprzedaje ani nie wypożycza nikomu Twoich danych osobowych. Prześlemy Ci kopię wyników, abyś miał do nich wygodny dostęp.
            </Typography>
            <Button title="Dalej" type="primary" sx={{ width: '100%', mt: 2 }} onClick={sendEmailHandler} />
          </Box>
        </Fade>
      </Modal>
    </main>
  );
}