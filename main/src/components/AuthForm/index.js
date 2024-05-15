'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Alert, Box, Button, Container, FormControl, IconButton, InputLabel, InputAdornment, OutlinedInput, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useBackground } from '@src/hooks/event'
import { email as emailIcon, passwordHidden, passwordVisisble } from '@src/utils/icons'

const DemoPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(4),
    overflow: 'hidden',
    padding: '32px 60px 80px',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '70vh'
}))

const MainButton = styled(Button)(({ theme }) => ({
    color: 'white',
    borderRadius: 32,
    boxShadow: 'none',
    height: 52,
    fontSize: 20,
    fontWeight: 500,
    marginTop: 10,
    fontFamily: 'unset',
    '&:hover': {
        boxShadow: 'none',
    }
}))

const CustomLabel = styled(InputLabel)(({ theme }) => ({
    transform: 'translate(16px, 16px)',
    fontFamily: 'unset',
    fontSize: 16,
    color: `${theme.palette.secondary.greyDarken1} !important`,
    '&.Mui-focused': {
        fontSize: 12,
        transform: 'translate(16px, 3px)',
    },
    '&.MuiFormLabel-filled': {
        fontSize: 12,
        transform: 'translate(16px, 3px)',
    }
}))

const CustomInput = styled(OutlinedInput)(({ theme, error }) => ({
    borderRadius: 10,
    border: `1px solid ${error ? theme.palette.secondary.red : theme.palette.primary.grey}`,
    boxShadow: 'none',
    height: 56,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'unset',
    color: theme.palette.primary.contrastText,
    '& input': {
        marginTop: 8,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none'
    },
    '& input:-webkit-autofill': {
        height: 0,
        boxShadow: '0 0 0px 1000px white inset',
    },
}))

export default function AuthForm({ title = '', subTitle = '', agreeText = '', signup = false, changePassword, currentUser = {}, error: serverError, message, onSubmit, onChangePassword, onRestorePassword }) {
    const router = useRouter()
    const [error, setError] = useState(serverError)
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    useBackground()

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
                <Button variant="filled" onClick={() => router.push('/login')}>
                    Go to login page
                </Button>
            </Box>
        )
    }

    return (
        <Container>
            <DemoPaper>

                <Stack sx={{ width: '50%' }}>
                    <Typography variant='h1'>{title}</Typography>
                    <Typography variant="body16" color='primary.contrastText' sx={{ width: '75%', marginTop: 2.5, fontSize: { xs: 12, md: 16 }, lineHeight: { xs: '18px', md: 'inherit' } }}>{subTitle}</Typography>
                    <Typography variant='bodyRegular12' color='secondary.greyDarken2' sx={{ width: '35%', position: 'absolute', bottom: 35 }}>{agreeText}</Typography>
                </Stack>

                <Stack sx={{ width: '50%', paddingTop: 10 }}>
                    <Stack>

                        {!changePassword && <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <CustomLabel>E-mail</CustomLabel>
                            <CustomInput
                                autoFocus
                                value={email || ''}
                                error={!!error}
                                type='email'
                                label="Email"
                                name="email"
                                disabled={!!currentUser.email}
                                onChange={e => setEmail(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {emailIcon}
                                    </InputAdornment>
                                }
                            />
                        </FormControl>}

                        {!resetPassword && <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                            <CustomLabel>{changePassword ? "New Password" : "Password"}</CustomLabel>
                            <CustomInput
                                value={password || ''}
                                error={error}
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
                                            {showPassword ? passwordVisisble : passwordHidden}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={changePassword ? "New Password" : "Password"}
                            />
                        </FormControl>}

                        {changePassword && (
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                <CustomLabel>Confirm Password</CustomLabel>
                                <CustomInput
                                    value={confirmPassword || ''}
                                    error={error}
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

                    <Stack sx={{ position: 'relative', marginLeft: 1 }}>

                        {!resetPassword && !changePassword && !signup && (
                            <Stack direction='row' justifyContent='space-between' sx={{ marginBottom: 2 }}>
                                <Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' color='secondary.red' onClick={() => setResetPassword(true)}>
                                    {error ? error : ''}
                                </Typography>
                                <Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' onClick={() => setResetPassword(true)}>
                                    Zapomniales hasla?
                                </Typography>
                            </Stack>
                        )}

                        {!resetPassword && !changePassword ? (
                            <MainButton
                                variant="contained"
                                disabled={!email || !password}
                                onClick={() => onSubmit({ email, password })}
                            >
                                {signup ? 'Załóż konto' : 'Zaloguj się'}
                            </MainButton>
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

                        <Stack direction='row' justifyContent='center' gap={1}
                            sx={{ width: '100%', marginTop: 5 }}
                        >
                            <Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' color='black'>
                                {signup ? 'Masz konta NAVIFIT?' : 'Nie masz jeszcze konta NAVIFIT?'}
                            </Typography>
                            <Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' onClick={() => router.push(`/${signup ? 'login' : 'signup'}`)}>
                                {signup ? 'Zaloguj się' : 'Załóż konto'}
                            </Typography>
                        </Stack>

                    </Stack>
                </Stack>
            </DemoPaper>
        </Container>
    );
}