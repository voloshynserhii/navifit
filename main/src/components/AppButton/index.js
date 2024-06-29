import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  fontWeight: '500',
  fontSize: 20,
  lineHeight: '30px',
  borderRadius: 32,
  textTransform: 'capitalize',
  padding: '14px 50px 14px 40px',
  width: 180,
  height: 52,
  fontFamily: 'unset',
  boxShadow: 'unset !important',
  [theme.breakpoints.down("md")]: {
    width: '100%',
    padding: '14px 5% 14px 0',
  },
  '&:hover': {
    opacity: '0.9',
  },
}));

const StyledArrowIcon = styled(ArrowForwardIosRoundedIcon)(({ theme }) => ({
  position: "absolute",
  right: 20,
  bottom: 16,
  [theme.breakpoints.down("sm")]: {
    position: "absolute",
    right: 30,
    bottom: 16
  },
}));

const MainButton = ({ type = 'secondary', title = '', noIcon, onClick, ...props }) => {
  return (
    <StyledButton
      variant="contained"
      endIcon={!noIcon && <StyledArrowIcon />}
      onClick={onClick}
      {...props}
    >
      {title}
    </StyledButton>
  )
}

export default MainButton