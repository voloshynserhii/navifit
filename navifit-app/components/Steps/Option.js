import { Box, Stack, HStack, Pressable, Text } from 'native-base'
import { StyleSheet } from 'react-native';

export default function Option({ option, long = false, prevData, onSelect = () => {}, onCheck = () => {} }) {
    const checked = prevData && prevData[option.value] ? prevData[option.value] : false;

    return (
        <Pressable 
            onPress={onSelect}
        // onPress={() => !long ? onSelect(option.value) : onCheck(option.value)}
        >
            <Box
                style={{ ...styles.optionContainer }}
                borderColor="primary.lightGrey"
                rounded="xl"
                borderWidth="1"
                selected={prevData && option.value === prevData || checked}
                gridview={long ? 1 : 0}
            >
                <HStack alignItems='center' justifyContent='space-between'>
                    <Stack sx={{ width: '100%' }}>
                        <HStack alignItems='center'>
                            <Text
                                color='primary.contrastText'
                                style={{
                                    fontFamily: 'Poppins_400Regular',
                                }}
                            >{option.title}</Text>
                        </HStack>
                    </Stack>
                </HStack>
            </Box>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    optionContainer: {
        paddingVertical: 16,
        paddingHorizontal: 14,
        marginVertical: 7,
    },
});