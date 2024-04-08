'use client'
import { useState } from 'react';
import { Alert, Box, Button, FormControl, IconButton, InputLabel, InputAdornment, OutlinedInput, Stack } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ResetPasswordModal from '../ResetPassword'


export default function AuthForm({ currentUser = {}, error, onSubmit }) {
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    };

    const resetPasswordHandler = () => {
        setResetPassword(true)
    }

    return (
        <Box sx={{ width: 350, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {error && <Alert sx={{ zIndex: 1301 }} variant="filled" severity="error">{error}</Alert>}
            <Stack sx={{ width: '100%' }}>
                {!resetPassword && (
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
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
                )}
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{resetPassword ? "New Password" : "Password"}</InputLabel>
                    <OutlinedInput
                        value={resetPassword ? '' : password || ''}
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
                        label={resetPassword ? "New Password" : "Password"}
                    />
                </FormControl>
                {resetPassword && (
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
            {!resetPassword && (
                <Box sx={{ width: '100%' }}>
                    <Button sx={{ fontSize: 8, }} onClick={resetPasswordHandler}>Reset Password</Button>
                </Box>
            )}
            {!resetPassword ? (
                <Button variant="contained" disabled={!email || !password} onClick={() => onSubmit({ email, password })}> {currentUser.email ? 'Sign Up' : 'Log In'}
                </Button>
            ) : (
                <Button variant="contained" disabled={!password} onClick={() => { }}>
                    Confirm
                </Button>
            )}
        </Box>
    );
}