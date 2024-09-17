import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Box, Icon, Stack, HStack, VStack, Menu, Text } from "native-base";
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/store'
import MenuButton from './MenuButton'
import LogOutButton from './LogOutButton'
import MenuIcon from '@/assets/icons/menu.svg'
import SklepIcon from '@/assets/icons/sklep.svg'
import AboutIcon from '@/assets/icons/about.svg'
import ContactIcon from '@/assets/icons/contact.svg'
import ConditionsIcon from '@/assets/icons/conditions.svg'
import AccountIcon from '@/assets/icons/account.svg'
import MenuBeforeIcon from '@/assets/icons/menuBefore.svg'

const userMenu = [
    {
        title: 'Mój plan posilkow',
        link: '/plan/:id',
    },
    {
        title: 'Moja subskrypcja',
        link: '/subscription',
    },
    {
        title: 'Preferencje',
        link: '/account',
    },
]


const menu = [
    {
        title: 'Sklep',
        link: '/shop',
        icon: <SklepIcon />
    },
    {
        title: 'O nas',
        link: '/about',
        icon: <AboutIcon />
    },
    {
        title: 'Skontaktuj się z nami',
        link: '/contact',
        icon: <ContactIcon />
    },
    {
        title: 'Regulamin',
        link: '/regulations',
        icon: <ConditionsIcon />
    },
    {
        title: 'Polityka prywatności',
        link: '/privacy',
        icon: <ConditionsIcon />
    },
    {
        title: 'Polityka cookies',
        link: '/cookies',
        icon: <ConditionsIcon />
    },
    {
        title: 'Polityka zwrotów ',
        link: '/returns',
        icon: <ConditionsIcon />
    },
];

export default function AppMenu(props) {
    const [state, dispatch] = useAppStore()
    const { isAuthenticated } = state
    const [open, setOpen] = useState(false)

    const logOutHandler = async () => {
        // signOut(auth)
        await AsyncStorage.setItem('loggedUser', '');
        dispatch({ type: 'LOG_OUT' })
        router.push('/')
    }

    return (
        <View style={styles.menuContainer} {...props}>
            <Menu
                style={styles.menu}
                shouldOverlapWithTrigger={false}
                trigger={triggerProps => {
                    return <Pressable style={styles.btn} accessibilityLabel="Menu" {...triggerProps}>
                        <MenuIcon width={21} height={21} />
                    </Pressable>;
                }}
            >
                <HStack style={styles.topContainer} borderBottomColor='secondary.greyLighten2'>
                    <Text style={styles.header}>Menu</Text>
                    <Menu.Item style={styles.btn} backgroundColor='secondary.light'>
                        <Icon as={Ionicons} name="close" color='primary.contrastText' size={7} />
                    </Menu.Item>
                </HStack>

                <VStack style={{ height: Dimensions.get('window').height - 160, justifyContent: 'space-between' }}>
                    <ScrollView>
                        <Stack style={{ paddingHorizontal: 12, marginTop: 24 }} >
                            {isAuthenticated && <Box style={{ paddingHorizontal: 24 }}>
                                <Pressable style={{ zIndex: 2, elevation: 2, marginBottom: 12 }} onPress={() => setOpen(prev => !prev)}>
                                    <HStack space={5} style={{ paddingHorizontal: 12, paddingVertical: 14, borderRadius: 8, backgroundColor: open ? '#F5F5F7' : 'transparent' }}>
                                        <AccountIcon />
                                        <Text style={styles.menuTitle} color='secondary.greyDarken2'>Moje Konto</Text>
                                    </HStack>

                                </Pressable>

                                {open && (
                                    <Box>
                                        {userMenu.map(({ title, link }) => (
                                            <Menu.Item key={title} style={[styles.menuItem, { marginLeft: 35 }]} onPress={() => router.push(link)}>
                                                <MenuBeforeIcon style={{ position: 'absolute', top: '-250%', left: -28, zIndex: 0, elevation: 0 }} />
                                                <Text style={styles.menuTitle} color='secondary.greyDarken2'>{title}</Text>
                                            </Menu.Item>
                                        ))}
                                    </Box>
                                )}
                            </Box>}

                            <Box>
                                {menu.map(({ title, icon, link }) => (
                                    <Menu.Item key={title} style={styles.menuItem} onPress={() => router.push(link)}>
                                        <HStack space={3} style={styles.menuItemContainer}>
                                            {icon}
                                            <Text style={styles.menuTitle} color='secondary.greyDarken2'>{title}</Text>
                                        </HStack>

                                    </Menu.Item>
                                ))}
                            </Box>
                        </Stack>
                    </ScrollView>
                    {!isAuthenticated ? (
                        <HStack justifyContent='space-between' style={{ width: '100%', paddingHorizontal: 24 }}>
                            <MenuButton
                                type='login'
                                title='Zaloguj się'
                                text='Mam juz konto'
                                mainColor='#3300FF'
                                textColor='white'
                                onPress={() => {
                                    router.push('/login')
                                }}
                            />
                            <MenuButton
                                type='signup'
                                title='Zaloz konto'
                                text='Nowy klient'
                                mainColor='#1C1C1E'
                                textColor='secondary.brandGreen'
                                onPress={() => {
                                    router.push('/signup')
                                }}
                            />
                        </HStack>
                    ) : (
                        <Box style={{ paddingHorizontal: 24 }}>
                            <LogOutButton
                                title='Wyloguj'
                                onPress={logOutHandler} />
                        </Box>
                    )}
                </VStack>
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
        height: Dimensions.get('window').height + 20,
        top: -100,
        paddingTop: 60,
        backgroundColor: 'white',
    },
    menuTitle: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        lineHeight: 21
    },
    btn: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    icon: {
        width: 21,
        height: 21,
    },
    topContainer: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    header: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 30,
        lineHeight: 45
    },
    menuItem: {
        borderRadius: 8,
        marginBottom: 4
    },
    menuItemContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: '100%',
    }
});