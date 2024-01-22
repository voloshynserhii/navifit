import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowIcon from '@src/components/Icons/Arrow'

const ColorButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: '20%',
    right: '10%',
    color: 'black',
    backgroundColor: 'rgba(var(--foreground-rgb))',
    fontWeight: '700',
    fontSize: '25px',
    borderRadius: 15,
    padding: '10px 28px',
    '&:hover': {
        backgroundColor: 'rgba(var(--foreground-rgb))',
      opacity: '0.4',
    },
  }));
  
const MainButton = ({ title = '', onClick }) => {
    return (<ColorButton variant="contained" endIcon={<ArrowIcon/>} onClick={onClick}>{title}</ColorButton>)
}
export default MainButton