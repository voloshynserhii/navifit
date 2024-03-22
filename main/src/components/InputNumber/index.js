import { useState, useEffect } from 'react';
import { Box, FilledInput, InputAdornment, FormHelperText, FormControl, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInput = styled(FilledInput)(({ theme, error }) => ({
    height: 115,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF !important',
    fontSize: 50,
    color: error ? theme.palette.primary.error : 'initial',
    '.MuiFilledInput-input': {
        textAlign: 'center',
        maxWidth: 170,
        paddingTop: 40,
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
    const theme = useTheme();
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
        
        if (+value < min) {
            onError(true)
            setError(true)
        } else {
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
                    value={current}
                    error={error}
                    endAdornment={<Typography variant="h2" disableTypography sx={{ fontSize: { xs: '30px', md: '40px' }, color: error ? theme.palette.primary.error : theme.palette.primary.main, position: 'absolute', right: 60, top: 30 }} position="end">{unit}</Typography>}
                    inputProps={{
                        'aria-label': placeholder,
                    }}
                    onChange={handleChange}
                />
                <Typography variant="body16" sx={{ textAlign: 'center', marginTop: 1.5, color: error ? theme.palette.primary.error : theme.palette.primary.bodyGrey }}>{`Proszę wpisać od ${min} do ${max} ${unit}`}</Typography>
            </FormControl>
        </Box>
    );
}