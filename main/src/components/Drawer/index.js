import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation'
import { Accordion, AccordionSummary, AccordionDetails, Box, Divider, IconButton, List, ListItem, ListItemButton, Stack, SwipeableDrawer, Typography, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useAppStore } from '../../store';
import MenuIcon from '../Icons/Menu';
import MenuButton from '../MenuButton';
// import { useEventSwitchDarkMode } from '../../hooks';
import { localStorageGet } from '../../utils/localStorage';

const menu = [
    {
        title: 'Sklep',
        link: '/shop'
    },
    {
        title: 'O nas',
        link: '/about'
    },
    {
        title: 'Skontaktuj się z nami',
        link: '/contact'
    },
    {
        title: 'Wsparcie',
        link: '/about'
    },
    // {
    //     title: 'Warunki i zasady',
    //     link: '/conditions'
    // },
    {
        title: 'Regulamin',
        link: '/regulations'
    },
    {
        title: 'Polityka prywatności',
        link: '/regulations/privacy'
    },
    {
        title: 'Polityka cookies',
        link: '/regulations/cookies'
    },
    {
        title: 'Polityka zwrotów ',
        link: '/regulations/returns'
    },
];

const ListItemContainer = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 8,
    padding: '12px 16px',
}));

const CustomAccordion = styled((props) => (
    <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: 'none',
    '&::before': {
        display: 'none',
    },
}));

export default function SwipeableTemporaryDrawer() {
    const [globalState, dispatch] = useAppStore();
    const { isAdmin, isAuthenticated, currentUser } = globalState;
    const router = useRouter();
    const [state, setState] = useState({
        right: false,
    });

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
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 415, height: '100%', padding: '24px' }}
                role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
            >

                <List sx={{ height: '100%' }}>
                    {!!isAuthenticated && (<CustomAccordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Moje Konto
                        </AccordionSummary>
                        <AccordionDetails>
                            <ListItem disablePadding>
                                <ListItemContainer onClick={() => router.push(`/account/plan/${currentUser._id}`, { scroll: false })}>
                                    <Typography variant='regular16'>Mój plan posiłków</Typography>
                                </ListItemContainer>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemContainer onClick={() => router.push('/account/subscription', { scroll: false })}>
                                    <Typography variant='regular16'>Moja subskrypcja</Typography>
                                </ListItemContainer>
                            </ListItem>
                            {!isAdmin ? <ListItem disablePadding>
                                <ListItemContainer onClick={() => {
                                    dispatch({ type: 'LOG_OUT' })
                                    router.push('/', { scroll: false })
                                }}>
                                    <Typography variant='regular16'>Wyloguj</Typography>
                                </ListItemContainer>
                            </ListItem> : (
                                <ListItem disablePadding>
                                    <ListItemContainer onClick={() => router.push('/admin', { scroll: false })}>
                                        <Typography variant='regular16'>Go To Admin Panel</Typography>
                                    </ListItemContainer>
                                </ListItem>
                            )}
                        </AccordionDetails>
                    </CustomAccordion>)}
                    <Stack sx={{ height: '75%', overflow: 'scroll' }}>
                        {menu.map(({ title, link }) => (
                            <ListItem key={title} disablePadding>
                                <ListItemContainer onClick={() => router.push(link, { scroll: false })}>
                                    <Typography variant='regular16' >{title}</Typography>
                                </ListItemContainer>
                            </ListItem>
                        ))}
                    </Stack>

                    {!isAuthenticated && (
                        <Stack direction='row' justifyContent='space-between' gap={1.5} sx={{ position: 'absolute', bottom: 8, width: '100%' }}>
                            <MenuButton type='login' title='Zaloguj się' text='Mam juz konto' mainColor='primary.main' textColor='white' onClick={() => router.push('/login', { scroll: false })} />
                            <MenuButton type='signup' title='Nowy klient' text='Nowy klient' mainColor='secondary.brandBlack' textColor='secondary.brandGreen' onClick={() => router.push('/signup', { scroll: false })} />
                        </Stack>
                    )}
                </List>
                {/* <Switch
                checked={globalState.darkMode}
                onChange={onSwitchDarkMode}
                inputProps={{ 'aria-label': 'controlled' }}
            /> */}
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