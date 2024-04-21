import { Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

const DescriptionContainer = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(2.5),
    marginRight: theme.spacing(3.75),
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(1),
    // [theme.breakpoints.down("sm")]: {
    //     padding: '12.5px 10px',
    //     margin: '0 6px 14px 0'
    // },
}));

export default function StyledDescription({ icon, text, showWarning }) {
    return (
        <DescriptionContainer gap={1}>
            <Stack direction='row' alignItems='center' gap={2}>
                {icon || showWarning.icon}
                <Typography variant='medium16'>{text || showWarning.title}</Typography>
            </Stack>
            {showWarning && <Typography variant='body14'>{showWarning.text}</Typography>}
        </DescriptionContainer>
    )
}