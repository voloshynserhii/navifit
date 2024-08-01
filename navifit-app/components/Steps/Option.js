import { Box, Pressable, Text } from 'native-base'
import { StyleSheet } from 'react-native';

export default function Option({ option, long = false, prevData, onSelect = () => { }, onCheck = () => { } }) {
    const checked = prevData && prevData[option.value] ? prevData[option.value] : false;
    const selected = prevData && option.value === prevData || checked

    return (
        <Pressable
            onPress={() => !long ? onSelect(option.value) : onCheck(option.value)}
        >
            <Box
                style={long ? { ...styles.optionContainer, ...styles.longContainer } : styles.optionContainer}
                borderColor={selected ? "primary.main" : "primary.lightGrey"}
                borderRadius={long ? "full" : "xl"}
                borderWidth="1"
                selected={prevData && option.value === prevData || checked}
                gridview={long ? 1 : 0}
            >
                <Text
                    color='primary.contrastText'
                    style={{
                        fontFamily: 'Poppins_400Regular',
                        width: 'fit-content'
                    }}
                >
                    {option.title}
                </Text>
            </Box>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    optionContainer: {
        paddingVertical: 16,
        paddingHorizontal: 14,
        marginVertical: 7,
    },
    longContainer: {
        alignSelf: 'center'
    }
});