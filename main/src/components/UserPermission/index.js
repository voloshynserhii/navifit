import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledSpan = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.contrastText,
    cursor: 'pointer',
    [theme.breakpoints.down("md")]: {
        fontSize: '12px',
      },
}))

const UserPermission = () => {
    return (
        <Typography variant="body16" sx={{ color: 'primary.grey2', fontSize: { xs: '12px', md: 'inherit' }, lineHeight: { xs: '18px', md: 'inherit' } }}>
            Wybierając cel i kontynuując, wyrażasz zgodę na nasze
            <StyledSpan component='span' variant='span'> Warunki korzystania</StyledSpan> z usługi | <StyledSpan component='span' variant='span'>Polityka prywatności</StyledSpan>
        </Typography>
    )
}

export default UserPermission