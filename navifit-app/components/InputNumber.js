import { useState, useEffect } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { Box, Input, FormControl, Text } from 'native-base';

export default function InputNumber({ value, currentStep, placeholder, min, max, unit, onChange, onError }) {
    const [current, setCurrent] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (value) {
            setCurrent(value)
        } else {
            setCurrent('')
        }
    }, [currentStep, value, min])

    const handleChange = (value) => {
        if (value.length > 3) return

        if (!current && value === '0') return

        if (isNaN(+value) || +value < min) {
            onError(true)
            setError(true)
        } else if (+value <= max) {
            Keyboard.dismiss()
            onError(false)
            setError(false)
        }

        if (+value <= max) {
            onChange(value)
            setCurrent(value)
        }
    }

    return (
        <Box style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <FormControl isInvalid={!!error} style={styles.container}>
                <Input
                    style={styles.input}
                    variant="underlined"
                    keyboardType='number-pad'
                    maxLength={3}
                    type='number'
                    value={current}
                    error={error}
                    rightElement={<Box style={styles.addOnTextContainer}><Text style={styles.addOnText} color={error ? 'primary.error' : 'primary.main'}>{unit}</Text></Box>}
                    _focus={{ borderColor: '#212121' }}
                    onChangeText={handleChange}
                />
                <Text variant="body16" color={error ? 'primary.error' : 'primary.bodyGrey'} style={{ textAlign: 'center', marginTop: 20 }}>{`Proszę wpisać od ${min} do ${max} ${unit}`}</Text>
            </FormControl>
        </Box>
    );
}
const styles = StyleSheet.create({
    container: {
        m: 1,
        width: '90%',
        height: 115,
        marginLeft: '5%',
    },
    input: {
        height: 60,
        textAlign:'center',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 40,
        marginLeft: 50,
        color: '#1C2227'
    },
    addOnTextContainer: {
        height: 40, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        paddingRight: 20,
        marginBottom: -15
    },
    addOnText: {
        fontWeight: 600, 
        fontSize: 30,
        lineHeight: 0,
    }
});
