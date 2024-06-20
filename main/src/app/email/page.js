'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Paper, Container, Stack, Alert, CircularProgress, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { isEmail } from '@src/utils/functions'
import api from '../../utils/api'
import Button from '../../components/AppButton'
import { useAppStore } from '../../store';
import { useBackground } from '../../hooks'
import { protection } from '../../utils/icons'

const DemoPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: theme.spacing(4),
  overflow: 'hidden',
  padding: '58px 60px',
  boxShadow: 'none',
  backgroundColor: theme.palette.secondary.light,
  marginBottom: 48,
  [theme.breakpoints.down("md")]: {
    padding: '56px 12px 30px',
  },
}))

const EmailInput = styled(TextField)(({ theme }) => ({
  '&.MuiTextField-root .MuiInputBase-root': {
    borderRadius: 10
  }
}))

export default function EmailPage() {
  useBackground();
  const router = useRouter();
  const [state, dispatch] = useAppStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!Object.keys(state.userData).length || !state.userData) router.push('/');
  }, [state.userData])

  const sendEmailHandler = () => {
    const data = {
      email,
      userData: state.userData
    }

    setLoading(true)

    api.user.sendAnswers(process.env.NEXT_PUBLIC_DB_HOST, data).then(({ user, message }) => {
      if (!user && message) {
        setError(message)
        setLoading(false)
      } else {
        setLoading(false)

        dispatch({
          type: 'USER_DATA',
          payload: user,
        })

        router.push('/subscriptions', { scroll: false })
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  return (
    <main>
      {loading && <CircularProgress color="inherit" />}

      {error && <Alert sx={{ zIndex: 1301 }} variant="filled" severity="error">{error}</Alert>}

      <Container>
        <DemoPaper sx={{ minHeight: { md: '80vh' } }}>
          <Stack alignItems='center' justifyContent='center' sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
            <Stack alignItems='center' mb={4}>
              <Typography variant="h2" sx={{ width: '100%' }}>
                Wpisz swój adres e-mail,
              </Typography>
              <Typography variant="h2" color='primary'>
                aby dowiedzieć się, jak schudnąć
              </Typography>
            </Stack>

            <EmailInput label="Your email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

            <Stack direction='row' gap={1} mt={1}>
              {protection}
              <Typography variant="bodyRegular12">
                Navifit nie sprzedaje ani nie wypożycza nikomu Twoich danych osobowych. Prześlemy Ci kopię wyników, abyś miał do nich wygodny dostęp.
              </Typography>
            </Stack>
            
            <Button 
              title="Dalej" 
              type="primary" 
              sx={{ display: 'flex', width: '100%', mt: 4 }} 
              disabled={!isEmail(email)}
              onClick={sendEmailHandler} 
            />
          </Stack>

        </DemoPaper>
      </Container>
    </main>
  )
}