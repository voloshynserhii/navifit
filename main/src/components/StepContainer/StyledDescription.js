import { Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

const DescriptionContainer = styled(Stack)(({ theme, error, success }) => ({
    marginTop: theme.spacing(2.5),
    marginRight: theme.spacing(3.75),
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    backgroundColor: theme.palette.secondary.light,
    borderRadius: theme.spacing(1),
    border: error ? `1px solid ${theme.palette.primary.redLighten1}` : success ? `1px solid ${theme.palette.primary.greenLighten1}` : 'unset'
    // [theme.breakpoints.down("sm")]: {
    //     padding: '12.5px 10px',
    //     margin: '0 6px 14px 0'
    // },
}));

export default function StyledDescription({ icon, text, showWarning }) {
    return (
        <DescriptionContainer gap={1} error={showWarning?.isWarning && 'true'} success={showWarning?.isOk && 'true'}>
            <Stack direction='row' alignItems='center' gap={2}>
                {icon || showWarning.icon}
                <Typography variant='medium16'>{text || showWarning.title}</Typography>
            </Stack>
            {showWarning && <Typography variant='body14'>{showWarning.text}</Typography>}
        </DescriptionContainer>
    )
}