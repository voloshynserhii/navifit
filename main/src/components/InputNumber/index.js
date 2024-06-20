import { useState, useEffect } from 'react';
import { Box, FilledInput, FormControl, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInput = styled(FilledInput)(({ theme, error }) => ({
    height: 115,
    padding: '0 60px 30px',
    fontFamily: 'unset',
    borderRadius: 10,
    backgroundColor: '#FFFFFF !important',
    fontSize: 50,
    fontWeight: 600,
    color: error ? theme.palette.primary.error : 'initial',
    [theme.breakpoints.down("md")]: {
        height: 100,
        padding: '20px 24px',
        fontSize: 40,
    },
    '.MuiFilledInput-input': {
        textAlign: 'center',
        position: 'absolute',
        top: '-4%',
        left: '-12%',
    },
    '.MuiFilledInput-root' : {
        backgroundColor: '#FFFFFF',
    },
    '.Mui-focused': {
        backgroundColor: '#FFFFFF',
        width: 300
    },
    '.Mui-error' : {
        backgroundColor: '#FFFFFF',
    },
    '&::hover': {
        backgroundColor: '#FFFFFF',
    },
    '&::before': {
        transform: 'translate(20%, -20px)',
        width: '72%',
    },
    '&::after': {
        display: 'none'
    },
}));

export default function InputAdornments({ value, currentStep, placeholder, min, max, unit, onChange, onError }) {
    const [current, setCurrent] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
      if (value) {
        setCurrent(value)
    } else {
        setCurrent('')
    }
    }, [currentStep, value, min])
    
    const handleChange = (e) => {
        const { value } = e.target

        if (value.length > 3) return
        
        if (!current && value === '0') return

        if (isNaN(+value) || +value < min) {
            onError(true)
            setError(true)
        } else  if (+value <= max) {
            onError(false)
            setError(false)
        }
        
        if (+value <= max) {
            onChange(value)
            setCurrent(value)
        }
    }
    
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <FormControl sx={{ m: 1, width: '360px' }} variant="filled">
                <StyledInput
                    type='number'
                    value={current}
                    error={error}
                    endAdornment={<Typography disabletypography="true" sx={{ fontWeight: 600, fontSize: { xs: '30px', md: '40px' }, color: error ? 'primary.error' : 'primary.main', position: 'absolute', right: { xs: 50, sm: 70 }, top: 30 }} position="end">{unit}</Typography>}
                    inputProps={{
                        'aria-label': placeholder,
                    }}
                    onChange={handleChange}
                />
                <Typography variant="body16" sx={{ textAlign: 'center', marginTop: 1.5, color: error ? 'primary.error' : 'primary.bodyGrey' }}>{`Proszę wpisać od ${min} do ${max} ${unit}`}</Typography>
            </FormControl>
        </Box>
    );
}