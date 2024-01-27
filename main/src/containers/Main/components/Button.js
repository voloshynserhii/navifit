import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowIcon from '@src/components/Icons/Arrow'

const ColorButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    color: 'black',
    backgroundColor: 'rgba(var(--mainGreen-rgb))',
    fontWeight: '500',
    fontSize: '25px',
    borderRadius: 15,
    padding: '10px 28px',
    textTransform: 'capitalize',
    '&:hover': {
        backgroundColor: 'rgba(var(--mainGreen-rgb))',
      opacity: '0.4',
    },
  }));
  
const MainButton = ({ title = '', onClick }) => {
    return (<ColorButton variant="contained" endIcon={<ArrowIcon/>} onClick={onClick}>{title}</ColorButton>)
}
export default MainButton