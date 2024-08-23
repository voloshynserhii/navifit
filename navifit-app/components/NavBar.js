import { View, Image, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Menu from './Menu';

export default function NavBar(props) {
    return (
        <View style={styles.navBar} {...props}>
            <Pressable onPress={() => router.push('/(app)')}>
                <Image
                    style={styles.logo}
                    source={require('@/assets/images/navifit-logo.png')}
                />
            </Pressable>
            <Menu/>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'transparent',
        marginLeft: 8,
        marginRight: 8,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,

    },
    logo: {
        height: 30,
        width: 150
    },
});