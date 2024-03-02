'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAppStore } from '../../store'
import { Alert, Box, Button, FormControl, FormHelperText, IconButton, InputLabel, InputAdornment, OutlinedInput, Stack } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import api from '../../utils/api'

export default function InputAdornments() {
  const router = useRouter()
  const [state, dispatch] = useAppStore()
  const { currentUser = {} } = state
  const [email, setEmail] = useState(currentUser.email)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  };

  const handleAuthorize = () => {
    const type = currentUser.email ? 'SIGN_UP' : 'LOG_IN'

    api.user.signUp(process.env.NEXT_PUBLIC_DB_HOST, { email, password, type }).then(({ message }) => {
      if (message) {
        setError(message)
      } else {
        dispatch({ type })
        router.push('/account/plan')
      }
    }).catch((err) => console.log(err))
  }

  return (
    <main>
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {error && <Alert sx={{ zIndex: 1301 }} variant="filled" severity="error">{error}</Alert>}
        <Stack>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
            <OutlinedInput
              autoFocus
              value={email || ''}
              error={false}
              // id="outlined-adornment-password"
              type='email'
              label="Email"
              disabled={!!currentUser.email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              value={password || ''}
              error={false}
              // id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Stack>
        <Button variant="contained" disabled={!email || !password} onClick={handleAuthorize}>{currentUser.email ? 'Sign Up' : 'Log In'}</Button>
      </Box>
    </main>
  );
}