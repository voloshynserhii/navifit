import { useState, useEffect, Fragment } from 'react';
import { getAuth, signOut } from "firebase/auth"
import { useRouter, usePathname } from 'next/navigation'
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import app from '../../../firebase/config'
import { useAppStore } from '../../store';
import MenuIcon from '../Icons/Menu';
import MenuButton from '../MenuButton';
import { sklep, info, contact, conditions, about, user, logOut, menuBeforeIcon } from '../../utils/icons'
import { localStorageGet } from '../../utils/localStorage';
import styles from './index.module.css'

const auth = getAuth(app);

const userMenu = {
    title: 'Moje Konto',
    link: '/account',
    icon: user,
    subMenu: [
        {
            title: 'Mój plan posilkow',
            link: '/account/plan/:id',
        },
        {
            title: 'Moja subskrypcja',
            link: '/account/subscription',
        },
        {
            title: 'Preferencje',
            link: '/account',
        },
    ]
};

const menu = [
    {
        title: 'Sklep',
        link: '/shop',
        icon: sklep
    },
    {
        title: 'O nas',
        link: '/about',
        icon: info
    },
    {
        title: 'Skontaktuj się z nami',
        link: '/contact',
        icon: contact
    },
    // {
    //     title: 'Wsparcie',
    //     link: '/about',
    //     icon: about
    // },
    // {
    //     title: 'Warunki i zasady',
    //     link: '/conditions',
    //     icon: conditions
    // },
    {
        title: 'Regulamin',
        link: '/regulations',
        icon: conditions
    },
    {
        title: 'Polityka prywatności',
        link: '/regulations/privacy',
        icon: conditions
    },
    {
        title: 'Polityka cookies',
        link: '/regulations/cookies',
        icon: conditions
    },
    {
        title: 'Polityka zwrotów ',
        link: '/regulations/returns',
        icon: conditions
    },
];

const ListItemContainer = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 8,
    padding: '12px 16px',
}));

const LogOutButton = styled(Button)(({ theme }) => ({
    border: `1px solid ${theme.palette.secondary.greyLighten2}`,
    borderRadius: 32,
    height: 52,
    fontFamily: 'unset',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'white'
    },
    '&:hover span': {
        color: theme.palette.secondary.red
    },
    '&:hover path': {
        stroke: theme.palette.secondary.red
    }
}));

export default function SwipeableTemporaryDrawer() {
    const [globalState, dispatch] = useAppStore();
    const { isAdmin, isAuthenticated, currentUser } = globalState;
    const router = useRouter();
    const [state, setState] = useState({
        right: false,
    });
    const [userMenuExpanded, setUserMenuExpanded] = useState('')
    const [menuActive, setMenuActive] = useState('')
    const path = usePathname();

    useEffect(() => {
        setMenuActive(path)

        if (path) {
            userMenuExpanded ? setUserMenuExpanded(path) : setMenuActive(path)
        }
    }, [path])

    useEffect(() => {
        const admin = localStorageGet('adminUser')

        if (admin) {
            dispatch({
                type: 'ADMIN_MODE_ON',
            });
        }
    }, [])

    // const onSwitchDarkMode = useEventSwitchDarkMode();

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <>
            <Stack direction='row' justifyContent='space-between' sx={{ padding: '12px 24px' }}>
                <Typography variant='h2'>Menu</Typography>
                <IconButton
                    sx={{ borderRadius: '8px', backgroundColor: 'secondary.light' }}
                    onClick={toggleDrawer(anchor, false)}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider />
            <Box
                sx={{ width: { xs: '100vw', md: 415 }, height: '89vh', padding: '24px' }}
                role="presentation"
            >

                <List sx={{ height: '100%' }}>
                    <Stack sx={{ height: isAuthenticated ? '85%' : '75%', overflow: 'scroll' }}>
                        {isAuthenticated && (
                            <Accordion disableGutters elevation={0} square onChange={(e, expanded) => {
                                setUserMenuExpanded(userMenu.subMenu[0].link)
                                setMenuActive('')
                                router.push(userMenu.subMenu[0].link.replace(':id', currentUser._id), { scroll: false })
                            }}>
                                <AccordionSummary
                                    sx={{ zIndex: 2 }}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    className={userMenuExpanded ? styles.expanded : ''}
                                >
                                    <Stack direction='row' gap={2}>
                                        {userMenu.icon}
                                        <Typography variant='regular16'>{userMenu.title}</Typography>
                                    </Stack>
                                </AccordionSummary>
                                {userMenuExpanded && <AccordionDetails sx={{ paddingRight: 0, paddingLeft: '34px' }}>
                                    {userMenu.subMenu.map(({ title, link }, i) => {
                                        const path = link.replace('/account', '').replace('/:id', '')

                                        return (
                                            <ListItem
                                                sx={{ z_ndex: 2 }}
                                                key={title}
                                                disablePadding
                                                className={path && userMenuExpanded?.indexOf(path) > -1 ? styles.expanded : ''}
                                            >
                                                <div style={{ position: 'absolute', top: '-80%', left: '-5%' }}>
                                                    {menuBeforeIcon}
                                                </div>
                                                <ListItemContainer
                                                    onClick={() => {
                                                        router.push(link.replace(':id', currentUser._id), { scroll: false })
                                                        setState({ anchor: false })
                                                        setUserMenuExpanded(link)
                                                        setMenuActive('')
                                                    }}
                                                >
                                                    <Stack direction='row' >
                                                        <Typography variant='regular16'>{title}</Typography>
                                                    </Stack>
                                                </ListItemContainer>
                                            </ListItem>
                                        )
                                    })}
                                </AccordionDetails>}
                            </Accordion>
                        )}
                        <Stack>
                            {menu.map(({ title, link, icon }) => (
                                <ListItem key={title} disablePadding className={menuActive === link ? styles.expanded : ''}>
                                    <ListItemContainer
                                        onClick={() => {
                                            router.push(link, { scroll: false })
                                            setState({ anchor: false })
                                            setUserMenuExpanded('')
                                        }}
                                    >
                                        <Stack direction='row' gap={2}>
                                            {icon}
                                            <Typography variant='regular16' >{title}</Typography>
                                        </Stack>
                                    </ListItemContainer>
                                </ListItem>
                            ))}
                        </Stack>
                    </Stack>

                    {!isAuthenticated ? (
                        <Stack direction='row' justifyContent='space-between' gap={1.5} sx={{ position: 'absolute', bottom: 8, width: '100%', maxWidth: 415 }}>
                            <MenuButton
                                type='login'
                                title='Zaloguj się'
                                text='Mam juz konto'
                                mainColor='primary.main'
                                textColor='white'
                                onClick={() => {
                                    setState({ anchor: false })
                                    router.push('/login', { scroll: false })
                                }}
                            />
                            <MenuButton
                                type='signup'
                                title='Nowy klient'
                                text='Nowy klient'
                                mainColor='secondary.brandBlack'
                                textColor='secondary.brandGreen'
                                onClick={() => {
                                    setState({ anchor: false })
                                    router.push('/signup', { scroll: false })
                                }}
                            />
                        </Stack>
                    ) : (
                        <Stack sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
                            <LogOutButton
                                endIcon={<div style={{ position: 'absolute', right: 14, bottom: 3 }}>{logOut}</div>}
                                onClick={() => {
                                    signOut(auth)
                                    dispatch({ type: 'LOG_OUT' })
                                    router.push('/', { scroll: false })
                                    setState({ anchor: false })
                                }}>
                                <Typography variant='medium14' color='secondary.greyDarken1'>Wyloguj</Typography>
                            </LogOutButton>
                        </Stack>
                    )}
                </List>
            </Box>
        </>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </Fragment>
            ))}
        </div>
    );
}