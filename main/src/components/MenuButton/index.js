import { Stack, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

const ButtonContainer = styled(Stack)(({ theme, type }) => ({
  backgroundColor: theme.palette.secondary.light,
  borderRadius: 24,
  padding: '12px 22px',
  gap: 25,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: type === 'login' ? theme.palette.primary.main : theme.palette.secondary.brandGreen
  },
  '&:hover h3': {
    color: type === 'login' ? 'white' : theme.palette.secondary.brandBlack
  },
  '&:hover button': {
    color: type === 'login' ? theme.palette.primary.main : theme.palette.secondary.brandGreen,
    backgroundColor: type === 'login' ? 'white' : theme.palette.secondary.brandBlack
  },
}));

const StyledButton = styled(Button)(({ theme, type }) => ({
  fontWeight: '500',
  fontSize: 14,
  lineHeight: '21px',
  borderRadius: 32,
  textTransform: 'capitalize',
  padding: '10px 23px',
  fontFamily: 'unset',
  boxShadow: 'none',
  // [theme.breakpoints.down("md")]: {
  //   width: 'calc(100% - 16px)',
  //   padding: '14px 15% 14px 0',
  // },
}));

const MenuButton = ({ type, title = '', text = '', mainColor, textColor, onClick, ...props }) => {
  return (
    <ButtonContainer type={type}>
      <Typography variant='h3' color={mainColor} sx={{ fontWeight: 500 }}>{text}</Typography>
      <StyledButton
        sx={{ backgroundColor: mainColor, color: textColor }}
        type={type}
        onClick={onClick}
        {...props}
      >
        {title}
      </StyledButton>
    </ButtonContainer>
  )
}

export default MenuButton