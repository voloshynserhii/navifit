'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Alert, Box, Button, Container, FormControl, IconButton, InputLabel, InputAdornment, OutlinedInput, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { email as emailIcon, passwordHidden, passwordVisisble, OK } from '@src/utils/icons'
import { isEmail } from '@src/utils/functions'

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
    minHeight: '70vh',
    [theme.breakpoints.down("md")]: {
        flexDirection: 'column',
        padding: '36px 12px 100px',
        minHeight: 'auto',
    },
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 32,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("md")]: {
        top: 10,
    },
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
    textTransform: 'none',
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

const defaultValidationValue = {
    emailError: '',
    password: {
        chars: false,
        digit: false,
        letter: false
    },
    passwordMatch: true
}

export default function AuthForm({ title = '', subTitle = '', agreeText = '', signup = false, changePassword, currentUser = {}, error: serverError, message, onClearError = () => { }, onSubmit, onChangePassword, onRestorePassword, onGetConfirmedUser }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const userId = searchParams.get('user')
    const confirmed = searchParams.get('confirmed')

    const [validation, setValidation] = useState(defaultValidationValue)
    const [email, setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formIsValid, setFormIsValid] = useState(false)

    let header = title
    let subHeader = subTitle
    let mainButtonTitle = 'Zaloguj się'
    let helperButtonsText = ['Nie masz jeszcze konta NAVIFIT?', 'Załóż konto']

    if (signup) {
        mainButtonTitle = 'Załóż konto'
        helperButtonsText = ['Masz konta NAVIFIT?', 'Zaloguj się']
    }

    if (resetPassword) {
        header = 'Przypomnienie hasła'
        subHeader = 'Wpisz adres e-mail, na który jesteś zarejestrowana w aplikacji NAVIFIT'
        mainButtonTitle = 'Wyślij hasło'
        helperButtonsText = ['Masz pytanie?', 'Skontaktuj się z nami']
    }

    if (changePassword) {
        mainButtonTitle = 'Zresetuj hasło'
        helperButtonsText = []
    }

    useEffect(() => {
        if (userId && confirmed === 'true') {
            onGetConfirmedUser(userId)
        }
    }, [userId, confirmed])

    useEffect(() => {
        onClearError()
    }, [email, password, confirmPassword])

    useEffect(() => {
        const { emailError, password, passwordMatch } = validation

        if (!signup && !resetPassword && !changePassword && password && email) {
            setFormIsValid(true)
            return
        }

        if (!emailError && password.chars && password.digit && password.letter) {
            if (signup) {
                if (passwordMatch) {
                    setFormIsValid(true)
                } else {
                    setFormIsValid(false)
                }
            } else {
                setFormIsValid(true)
            }
        } else {
            setFormIsValid(false)
        }
    }, [validation])

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    };

    const onClickMainButton = () => {
        if (resetPassword) {
            confirmRestorePasswordHandler()
        } else if (changePassword) {
            confirmChangePasswordHandler()
        } else {
            onSubmit({ email, password, confirmPassword })
        }
    }

    const confirmChangePasswordHandler = () => {
        onChangePassword(password)
    }

    const confirmRestorePasswordHandler = () => {
        onRestorePassword({ email })
    }

    const validateFields = (field, val) => {
        if (field === 'password') {
            if (val) {
                if (val.length >= 8) {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], chars: true } }))
                } else {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], chars: false } }))
                }
                if (/\d/.test(val)) {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], digit: true } }))
                } else {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], digit: false } }))
                }
                if (/[a-zA-Z]/.test(val)) {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], letter: true } }))
                } else {
                    setValidation((prev) => ({ ...prev, [field]: { ...prev[field], letter: false } }))
                }
            } else {
                setValidation((prev) => ({ ...prev, ...defaultValidationValue[field] }))
            }

        } else if (field === 'passwordMatch') {
            if (val !== password) {
                setValidation((prev) => ({ ...prev, [field]: false }))
            } else {
                setValidation((prev) => ({ ...prev, [field]: true }))
            }

        } else {
            setValidation((prev) => ({ ...prev, [field]: val }))
        }
    }

    return (
        <Container>
            <DemoPaper>
                {resetPassword && (<StyledIconButton onClick={() => {
                    setResetPassword(false)
                    onClearError()
                }}>
                    <ArrowBackIosRoundedIcon />
                </StyledIconButton>)}

                <Stack sx={{ width: { xs: '100%', md: '50%' } }}>
                    <Typography variant='h1'>{header}</Typography>

                    <Typography variant="body16" color='primary.contrastText' sx={{ width: { xs: '90%', md: '75%' }, marginTop: 2.5, fontSize: { xs: 12, md: 16 }, lineHeight: { xs: '18px', md: 'inherit' } }}>{subHeader}</Typography>

                    {!resetPassword && <Typography variant='bodyRegular12' color='secondary.greyDarken2' sx={{ textAlign: { xs: 'center', md: 'start' }, width: { md: '35%' }, position: 'absolute', bottom: 35 }}>{agreeText}</Typography>}
                </Stack>

                <Stack sx={{ width: { xs: '100%', md: '50%' }, paddingTop: { xs: 2, md: 10 } }}>
                    {message && <Stack sx={{ padding: '12px 30px', borderRadius: 5, textAlign: 'center', backgroundColor: 'secondary.greyLighten5', mb: 1.5, gap: 1 }}>
                        <Typography variant='medium14' component='p' color='black'>{message} </Typography>
                    </Stack>}
                    
                    {currentUser && currentUser.oneTimePassword && !currentUser.isConfirmed && <Stack sx={{ padding: '12px 30px', borderRadius: 5, textAlign: 'center', backgroundColor: 'secondary.greyLighten5', mb: 1.5, gap: 1 }}>
                        <Typography variant='medium14' component='p' color='black'>Aby aktywować konto odbierz e-mail potwierdzający rejestrację i kliknij w link w treści wiadomości. </Typography>
                        <Typography variant='bodyRegular12' component='p' color='secondary.greyDarken2'>Jeżeli nie dostałeś wiadomości, sprawdź czy nie znajduje się ona w folderze spam Twojej poczty lub wyślij ponownie link aktywacyjny.</Typography>
                    </Stack>}

                    {userId && currentUser && currentUser.isConfirmed && !resetPassword && (
                        <Stack sx={{ padding: '12px 30px', borderRadius: 5, textAlign: 'center', backgroundColor: 'secondary.greyLighten5', mb: 1.5, gap: 1 }}>
                            <Stack direction='row' justifyContent='center' gap={1}>
                                {OK}
                                <Typography variant='medium14' component='p' color='black'>Twoje konto zostało aktywowane</Typography>
                            </Stack>
                            <Typography variant='bodyRegular12' component='p' color='secondary.greyDarken2'>Możesz zalogować się za pomocą swojego adresu e-mail i hasła</Typography>
                        </Stack>
                    )}

                    <Stack sx={{ gap: { xs: 2, md: 0 } }}>

                        {!changePassword && <FormControl sx={{ m: { xs: 0, md: 1 }, width: '100%' }} variant="outlined">
                            <CustomLabel>E-mail</CustomLabel>
                            <CustomInput
                                autoFocus
                                value={email || ''}
                                error={!!serverError || (email && !!validation.emailError)}
                                type='email'
                                label="Email"
                                name="email"
                                // disabled={!!currentUser.email && resetPassword}
                                onChange={e => setEmail(e.target.value?.trim())}
                                onBlur={(e) => !isEmail(e.target.value) ? validateFields('emailError', true) : validateFields('emailError', false)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {emailIcon}
                                    </InputAdornment>
                                }
                            />
                            {email && validation.emailError && <Typography variant='bodyRegular12' color='secondary.red'>Invalid email format</Typography>}
                        </FormControl>}

                        {!resetPassword && <FormControl sx={{ m: { xs: 0, md: 1 }, width: '100%' }} variant="outlined">
                            <CustomLabel>{changePassword ? "New Password" : "Password"}</CustomLabel>
                            <CustomInput
                                value={password || ''}
                                error={!!serverError}
                                type={showPassword ? 'text' : 'password'}
                                onChange={e => {
                                    setPassword(e.target.value?.trim())
                                    validateFields('password', e.target.value?.trim())
                                }}
                                onBlur={() => confirmPassword ? validateFields('passwordMatch', confirmPassword) : () => { }}
                                endAdornment={
                                    <InputAdornment position="end" sx={{ marginRight: 1.5 }}>
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
                            {(signup || changePassword) && password && (
                                <>
                                    <Typography variant='bodyRegular12' color='primary.contrastText'>Make sure your password contains:</Typography>
                                    <Typography variant='bodyRegular12' color={!validation.password.chars ? 'secondary.greyDarken2' : 'secondary.greenDarken1'}>Minimum 8 characters</Typography>
                                    <Typography variant='bodyRegular12' color={!validation.password.digit ? 'secondary.greyDarken2' : 'secondary.greenDarken1'}>At least 1 digit</Typography>
                                    <Typography variant='bodyRegular12' color={!validation.password.letter ? 'secondary.greyDarken2' : 'secondary.greenDarken1'}>At least 1 letter</Typography>
                                </>
                            )}
                        </FormControl>}

                        {(signup || changePassword) && (
                            <FormControl sx={{ m: { xs: 0, md: 1 }, width: '100%' }} variant="outlined">
                                <CustomLabel>Confirm Password</CustomLabel>
                                <CustomInput
                                    value={confirmPassword || ''}
                                    error={!!serverError}
                                    type={showPassword ? 'text' : 'password'}
                                    onBlur={() => validateFields('passwordMatch', confirmPassword)}
                                    onChange={e => setConfirmPassword(e.target.value?.trim())}
                                    endAdornment={
                                        <InputAdornment position="end" sx={{ marginRight: 1.5 }}>
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
                                    label="Confirm Password"
                                />
                                {confirmPassword && !validation.passwordMatch && <Typography variant='bodyRegular12' color='secondary.red'>Password didn’t match</Typography>}
                            </FormControl>
                        )}
                    </Stack>

                    <Stack sx={{ position: 'relative', marginLeft: 1 }}>

                        <Stack direction='row' justifyContent='space-between' sx={{ marginBottom: 2, marginTop: 1 }}>
                            <Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' color='secondary.red'>
                                {serverError ? serverError : ''}
                            </Typography>
                            {!resetPassword && !changePassword && !signup && (<Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' onClick={() => setResetPassword(true)}>
                                Zapomniales hasla?
                            </Typography>)}
                        </Stack>

                        <MainButton
                            variant="contained"
                            disabled={!formIsValid}
                            onClick={onClickMainButton}
                        >
                            {mainButtonTitle}
                        </MainButton>

                        {helperButtonsText?.length ? <Stack direction='row' justifyContent='center' gap={1}
                            sx={{ width: '100%', marginTop: 5 }}
                        >
                            <Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' color='black'>
                                {helperButtonsText[0]}
                            </Typography>
                            <Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' onClick={() => router.push(`/${signup ? 'login' : resetPassword ? 'contact' : 'signup'}`)}>
                                {helperButtonsText[1]}
                            </Typography>
                        </Stack> : <></>}

                    </Stack>
                </Stack>
            </DemoPaper>
        </Container>
    );
}