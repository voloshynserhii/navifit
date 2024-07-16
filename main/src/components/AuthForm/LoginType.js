import { Button, Divider, InputAdornment, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { google } from '@src/utils/icons'

const GoogleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    borderRadius: 32,
    boxShadow: 'none',
    height: 52,
    fontSize: 16,
    fontWeight: 500,
    marginTop: 10,
    fontFamily: 'unset',
    textTransform: 'none',
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.primary.lightGrey}`,
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'white',
    }
}))

const MainButton = styled(Button)(({ theme }) => ({
    color: 'white',
    borderRadius: 32,
    boxShadow: 'none',
    height: 52,
    fontSize: 16,
    fontWeight: 500,
    marginTop: 10,
    fontFamily: 'unset',
    textTransform: 'none',
    '&:hover': {
        boxShadow: 'none',
    }
}))

const LoginType = ({ onGoogleLogin, onEmailLogin, onSignUp }) => {
    return (
        <Stack sx={{ alignItems: 'center' }}>
            <Stack sx={{ width: { xs: '100%', md: '80%' } }}>
                <GoogleButton
                    variant="contained"
                    startIcon={
                        <InputAdornment position="start">
                            {google}
                        </InputAdornment>
                    }
                    onClick={onGoogleLogin}
                >
                    Zaloguj przez Google
                </GoogleButton>
                    
                <Divider sx={{ marginTop: 4, marginBottom: 4 }} variant="middle">lub</Divider>
                
                <MainButton variant="contained" onClick={onEmailLogin}>Kontynuuj z e-mailem</MainButton>
                
                <Stack direction='row' justifyContent='center' gap={1}
                    sx={{ width: '100%', marginTop: 5 }}
                >
                    <Typography variant='bodyRegular14' color='black'>
                        Nie masz jeszcze konta NAVIFIT?
                    </Typography>
                    <Typography sx={{ cursor: 'pointer' }} variant='bodyRegular14' onClick={onSignUp}>
                        Załóż konto
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default LoginType;