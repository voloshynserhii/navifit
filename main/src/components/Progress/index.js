import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.primary.grey
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.main
    },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 32,
    color: theme.palette.primary.black2
}))

const StyledStep = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main
}))

export default function CustomizedProgressBars({ step = 1, totalSteps, onStepBack }) {
    return (
        <Box sx={{ flexGrow: 1, width: { xs: '100%', md: '50%' }, marginTop: 6 }}>
            {step > 1 && <StyledIconButton onClick={onStepBack}>
                <ArrowBackIosRoundedIcon />
            </StyledIconButton>}
            <Stack direction='row' justifyContent='end'>
                <Typography variant='span' component='div'>
                    <StyledStep variant='span' component='span'>{step}</StyledStep>
                    /{totalSteps}
                </Typography>
            </Stack>
            <BorderLinearProgress variant="determinate" value={(step / totalSteps) * 100} sx={{ marginTop: '5px', marginBottom: 5 }} />
        </Box>
    );
}