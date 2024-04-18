'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Alert, Box, Button, FormControl, IconButton, InputLabel, InputAdornment, OutlinedInput, Stack } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export default function AuthForm({ loading = false, changePassword, currentUser = {}, error: serverError, message, onSubmit, onChangePassword, onRestorePassword }) {
    const router = useRouter()
    const [error, setError] = useState(serverError)
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if (error) setError(null)
    }, [email, password, confirmPassword])

    useEffect(() => {
        setError(serverError)
    }, [serverError])

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    };

    const confirmChangePasswordHandler = () => {
        if (password.trim() !== confirmPassword.trim()) {
            setError("New password and Confirm password don't match!")
        } else {
            onChangePassword(password)
        }
    }

    const confirmRestorePasswordHandler = () => {
        onRestorePassword({ email })
    }

    if (message) {
        return (
            <Box sx={{ width: 350, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Alert sx={{ zIndex: 1301, marginBottom: 5 }} variant="filled" severity="success">{message}</Alert>
                <Button variant="filled" onClick={() => router.push('/signup')}>
                    Go to login page
                </Button>
            </Box>
        )
    }

    return (
        <Box sx={{ width: 350, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {error && <Alert sx={{ zIndex: 1301 }} variant="filled" severity="error">{error}</Alert>}
            <Stack sx={{ width: '100%' }}>
                {!changePassword && <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
                    <OutlinedInput
                        autoFocus
                        value={email || ''}
                        error={false}
                        type='email'
                        label="Email"
                        name="email"
                        disabled={!!currentUser.email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormControl>}
                {!resetPassword && <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{changePassword ? "New Password" : "Password"}</InputLabel>
                    <OutlinedInput
                        value={password || ''}
                        error={false}
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
                        label={changePassword ? "New Password" : "Password"}
                    />
                </FormControl>}
                {changePassword && (
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            value={confirmPassword || ''}
                            error={false}
                            type={showPassword ? 'text' : 'password'}
                            onChange={e => setConfirmPassword(e.target.value)}
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
                            label="Confirm Password"
                        />
                    </FormControl>
                )}
            </Stack>
            {!resetPassword && !changePassword && (
                <Box sx={{ width: '100%', marginBottom: 2 }}>
                    <Button sx={{ fontSize: 8, }} onClick={() => setResetPassword(true)}>Nie pamiętam mojego hasła</Button>
                </Box>
            )}
            {!resetPassword && !changePassword ? (
                <Button sx={{ color: 'white' }} variant="contained" loading={loading} disabled={!email || !password} onClick={() => onSubmit({ email, password })}> {currentUser.email ? 'Sign Up' : 'Log In'}
                </Button>
            ) : (
                <Stack direction='row' gap={3}>
                    <Button variant="filled" onClick={() => resetPassword ? setResetPassword(false) : router.push('/')}>
                        Cancel
                    </Button>
                    <Button sx={{ color: 'white' }} variant="contained" disabled={resetPassword ? !email : !password && !confirmPassword} onClick={resetPassword ? confirmRestorePasswordHandler : confirmChangePasswordHandler}>
                        {resetPassword ? 'Restore Password' : 'Confirm'}
                    </Button>
                </Stack>

            )}
        </Box>
    );
}