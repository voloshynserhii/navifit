import { View, Image, Text, StyleSheet } from 'react-native';
import MenuButton from './MenuButton';

export default function NavBar(props) {
    return (
        <View style={styles.navBar} {...props}>
            <Image
                style={styles.logo}
                source={require('@/assets/images/navifit-logo.png')}
            />
            <MenuButton/>
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