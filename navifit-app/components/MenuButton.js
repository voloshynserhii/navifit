import { View, StyleSheet, Dimensions } from 'react-native';
import { Menu, Divider, Pressable} from "native-base";
import MenuIcon from '@/assets/icons/menu.svg'

export default function MenuButton(props) {
    return (
        <View style={styles.menuContainer} {...props}>
            <Menu style={styles.menu} shouldOverlapWithTrigger={false}
                trigger={triggerProps => {
                    return <Pressable style={styles.btn} accessibilityLabel="Menu" {...triggerProps}>
                        <MenuIcon width={21} height={21}/>
                    </Pressable>;
                }}>
                <Menu.Group title="Free">
                    <Menu.Item>Arial</Menu.Item>
                    <Menu.Item>Nunito Sans</Menu.Item>
                    <Menu.Item>Roboto</Menu.Item>
                </Menu.Group>
                <Divider mt="3" w="100%" />
                <Menu.Group title="Paid">
                    <Menu.Item>SF Pro</Menu.Item>
                    <Menu.Item>Helvetica</Menu.Item>
                </Menu.Group>
            </Menu>
        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        height: 40,
        width: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        padding: 4,
        backgroundColor: 'white',
    },
    menu: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'fixed',
        top: -50,
    },
    btn: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width:21,
        height: 21,
    }
});