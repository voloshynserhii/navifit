import { StyleSheet, Pressable } from 'react-native';
import { Box, Text, HStack, Menu } from 'native-base'
import LogOutIcon from '@/assets/icons/logOut.svg'

const LogOutButton = ({ title = '', onPress }) => {

    return (
        <Pressable style={({ pressed }) => styles({ pressed }).container}>
            {({ pressed }) => (
                <Menu.Item style={{ width: '100%', backgroundColor: 'transparent' }} onPress={onPress}>
                    <HStack style={styles({}).button}>
                        <Text style={styles({ pressed }).text}>{title}</Text>
                        <LogOutIcon style={styles({ pressed }).icon} />
                    </HStack>
                </Menu.Item>
            )}
        </Pressable>
    )
}

const styles = ({ pressed }) => StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 24,
        backgroundColor: 'white',
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    button: {
        width: '100%',
        paddingVertical: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        lineHeight: 21,
        color: pressed ? '#F44336' : '#616161'
    },
    icon: {
        position: 'absolute',
        right: 24,
        color: pressed ? '#F44336' : '#616161'
    }
})

export default LogOutButton