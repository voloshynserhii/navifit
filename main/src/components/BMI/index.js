import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const BMIContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 14,
    borderRadius: '70px',
    background: 'linear-gradient(90deg, #2DB7FF 0%, #9EF931 50.83%, #FFE44F 69.63%, #FF634B 100%)'
}));

const Pointer = styled(Box)(({ theme, left }) => ({
    position: 'absolute',
    top: -4,
    height: 22,
    width: 22,
    border: `3px solid ${theme.palette.secondary.gray}`,
    borderRadius: '70px',
    boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.25)',
    background: 'rgba(255, 255, 255, 1)',
    animation: `myEffect 1500ms ease-in-out`,
    "@keyframes myEffect": {
        "0%": {
            left: '0%',
        },
        "100%": {
            left
        }
    },
}));

const BMIInfo = styled(Box)(({ theme }) => ({
    width: 'max-content',
    background: theme.palette.secondary.gray,
    padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
    transform: 'translate(-43%, -60px)',
    borderRadius: 6
}));

const Connector = styled(Box)(({ theme }) => ({
    width: 2,
    height: 20,
    background: theme.palette.secondary.gray,
    transform: 'translate(7px, -60px)'
}));

const countPointerPosition = (BMI) => {
    const max = 97
    const multiplier = 2.1

    const position = 1 * multiplier * BMI
    return position > max ? max : position
}

export default function InfoStep({ BMI }) {
    return (
        <BMIContainer>
            <Pointer left={`${countPointerPosition(BMI)}%`}>
                <BMIInfo>
                    <Typography variant='medium14'>Twój - {BMI}</Typography>
                </BMIInfo>
                <Connector />
            </Pointer>
            <Stack direction='row' justifyContent='space-between' sx={{ paddingTop: 3 }}>
                <Typography variant='medium14' color={BMI < 18.5 ? 'primary.contrastText' : 'primary.lightGrey'}>niedowaga</Typography>
                <Typography variant='medium14' color={BMI >= 18.5 && BMI <= 25 ? 'primary.contrastText' : 'primary.lightGrey'}>normalna</Typography>
                <Typography variant='medium14' color={BMI > 25 && BMI < 32 ? 'primary.contrastText' : 'primary.lightGrey'}>nadwaga</Typography>
                <Typography variant='medium14' color={BMI >= 32 ? 'primary.contrastText' : 'primary.lightGrey'}>otyłość</Typography>
            </Stack>
        </BMIContainer>
    )
}