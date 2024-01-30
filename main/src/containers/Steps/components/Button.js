import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowIcon from '@src/components/Icons/Arrow'

const LargeButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'rgba(var(--mainGreen-rgb))',
  fontWeight: '700',
  fontSize: '18px',
  borderRadius: 24,
  textTransform: 'capitalize',
  padding: '10px 90px',
  '&:hover': {
    backgroundColor: 'rgba(var(--mainGreen-rgb))',
    opacity: '0.4',
  },
}));

const SmallButton = styled(Button)(({ theme }) => ({
  color: 'rgba(var(--foreground-rgb))',
  borderColor: 'rgba(var(--foreground-rgb))',
  fontWeight: '200',
  fontSize: '20px',
  borderRadius: theme.spacing(2),
  textTransform: 'capitalize',
  padding: '5px 20px',
  '&:hover': {
    borderColor: 'rgba(var(--foreground-rgb))',
  },
}));

const MainButton = ({ type = 'secondary', title = '', noIcon, onClick, ...props }) => {
  if (type === 'primary') {
    return (<LargeButton {...props} variant="contained" endIcon={!noIcon && <ArrowIcon type='short' />} onClick={onClick}>{title}</LargeButton>)
  }
  return <SmallButton {...props} variant="outlined" startIcon={!noIcon && <ArrowIcon type='short' direction='back' fillColor='rgba(var(--foreground-rgb))' />} onClick={onClick}>{title}</SmallButton>
}
export default MainButton