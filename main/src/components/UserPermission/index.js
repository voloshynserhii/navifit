import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledSpan = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.contrastText,
    cursor: 'pointer',
}))

const UserPermission = () => {
    return (
        <Typography>
            Wybierając cel i kontynuując, wyrażasz zgodę na nasze
            <StyledSpan component='span' variant='span'> Warunki korzystania</StyledSpan> z usługi | <StyledSpan component='span' variant='span'>Polityka prywatności</StyledSpan>
        </Typography>
    )
}

export default UserPermission