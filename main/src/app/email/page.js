'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Alert,Backdrop, Box, Fade, Modal, TextField, Typography } from '@mui/material'
import api from '../../utils/api'
import Button from '../../containers/Steps/components/Button'
import { useAppStore } from '../../store';

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

export default function TransitionsModal() {
  const router = useRouter()
  const [state, dispatch] = useAppStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState()

  useEffect(() => {
    if (!Object.keys(state.userData).length || !state.userData) router.push('/');
  }, [state.userData])

  const sendEmailHandler = () => {
    const data = {
      email,
      userData: state.userData
    }

    api.user.sendAnswers(process.env.NEXT_PUBLIC_DB_HOST, data).then(({ user, message }) => {
      if (!user && message) {
        setError(message)
      } else {
        dispatch({
          type: 'USER_DATA',
          payload: user,
        });
        router.push('/subscriptions', { scroll: false });
      }
    }).catch(() => router.push('/subscriptions'))
  }

  return (
    <main>
      {error && <Alert sx={{ zIndex: 1301 }} variant="filled" severity="error">{error}</Alert>}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open
        // onClose={() => router.push('/')}
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