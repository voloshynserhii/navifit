import { StyleSheet } from 'react-native';
import { Actionsheet, Avatar, Box, HStack, Pressable, Progress, Text, Spacer, VStack } from 'native-base';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';

const Counter = ({ counter }) => {
    const { number, total, unit } = counter;
    const minValue = 8;
    const value = (number / total) * 100;
    
    return (
        <VStack>
            <HStack mt={1} mb={1}>
                <Text>{number} / </Text>
                <Text color='primary.bodyGrey'>{total} {unit}</Text>
            </HStack>
            <Progress 
                value={value >= minValue ? value : minValue} 
                bg="#ECEFF1" 
                _filledTrack={{
                    bg: "#4CAF50"
                }}
            />
        </VStack>
    )
}

export default function PressableCard({ style = {}, icon = <></>, uri = '', title, text = '', counter = {}, textColor = '', onPress, children = <></> }) {
    return (
        <Box style={{ ...styles.card, ...style }}>
            <Pressable onPress={onPress}>
                <HStack alignItems="center">
                    <HStack alignItems="center" space={3}>
                        {icon}
                        {uri && (
                            <Avatar bg="green.500" size="lg" source={{ uri }}>
                                AJ
                            </Avatar>
                        )}
                        <VStack space={1}>
                            <Text style={styles.userName}>{title}</Text>
                            {Object.keys(counter).length ? <Counter counter={counter} /> : null}
                            {text && <Text style={styles.userText} color={textColor}>{text}</Text>}
                        </VStack>
                    </HStack>
                    <Spacer />
                    <ChevronRightIcon />
                </HStack>
            </Pressable>
            
            {children}
        </Box>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 16
    },
    userName: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        lineHeight: 24
    },
    userText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 21
    },
    menuText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        lineHeight: 24
    }
});