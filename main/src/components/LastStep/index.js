import moment from 'moment'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Graphic from './components/Graphic'

const DemoPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(4),
    overflow: 'hidden',
    padding: '26px 35px',
    boxShadow: 'none',
}))

const ColoredText = styled(Typography)(({ theme }) => ({
    display: 'inline',
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '30px',
    color: theme.palette.primary.main
}))

const ColoredText2 = styled(Typography)(({ theme }) => ({
    display: 'inline',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    color: theme.palette.primary.main
}))

export default function LastStep({ answers = {} }) {
    const { weight = 70, desiredWeight = 77, desiredDate } = answers ?? {}
    const endDate = moment().add(6, 'M').format('DD MMMM YYYY')
    
    return (
        <DemoPaper>
            <Stack justifyContent='center' alignItems='center'>
                <Typography variant='h3' sx={{ fontWeight: 500 }}>Przewidujemy, że będziesz </Typography>
                <Typography variant='regular16'>
                    <ColoredText>{desiredWeight} kg</ColoredText> do <ColoredText>{endDate}</ColoredText>
                </Typography>
                <Typography variant='medium14' color='secondary.greyDarken1'>
                    i {weight > desiredWeight ? 'przegraj' : 'przytyjesz'} w żądanym terminie <ColoredText2> ~{Math.abs(weight - desiredWeight)} Kg</ColoredText2>
                </Typography>
            </Stack>
            <Box sx={{ minHeight: 200, padding: '20px 0' }}>
                <Graphic startWeight={weight} endWeight={desiredWeight} desiredDate={desiredDate} startDate={moment()} endDate={endDate}/>
            </Box>
            <Stack>
                <Typography variant='greyDarken1'>*Na podstawie danych użytkowników rejestrujących swoje postępy w aplikacji. Najpierw skonsultuj się z lekarzem. Wykres nie jest ilustracją dostosowaną do indywidualnych potrzeb i wyniki mogą się różnić</Typography>
            </Stack>
        </DemoPaper>
    )
}




