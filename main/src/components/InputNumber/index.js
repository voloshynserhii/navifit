import { useState, useEffect } from 'react';
import { Box, FilledInput, InputAdornment, FormHelperText, FormControl, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInput = styled(FilledInput)(({ theme, error }) => ({
    height: 115,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 50,
    color: error ? theme.palette.primary.error : 'initial',
    '.MuiFilledInput-input': {
        textAlign: 'center',
        maxWidth: 170,
        paddingTop: 40,
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

        if (+value <= min) {
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
                    endAdornment={<InputAdornment disableTypography sx={{ fontSize: 40, color: error ? theme.palette.primary.error : theme.palette.primary.main, position: 'absolute', right: 60, top: 60 }} position="end">{unit}</InputAdornment>}
                    inputProps={{
                        'aria-label': placeholder,
                    }}
                    onChange={handleChange}
                />
                <FormHelperText sx={{ textAlign: 'center', color: error ? theme.palette.primary.error : 'initial' }}>{`Proszę wpisać od ${min} do ${max} ${unit}`}</FormHelperText>
            </FormControl>
        </Box>
    );
}