import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation'
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppStore } from '../../store';
import MenuIcon from '../Icons/Menu';
import { useEventSwitchDarkMode } from '../../hooks';
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
    {
        title: 'Warunki i zasady',
        link: '/conditions'
    },
];

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
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <CustomAccordion>
                    {isAuthenticated ? (
                        <div>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Moje Konto
                            </AccordionSummary>
                            <AccordionDetails>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => router.push(`/account/plan/${currentUser._id}`, { scroll: false })}>
                                        <ListItemText primary='Mój plan posiłków' />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => router.push('/account/subscription', { scroll: false })}>
                                        <ListItemText primary='Moja subskrypcja' />
                                    </ListItemButton>
                                </ListItem>
                                {!isAdmin ? <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        dispatch({ type: 'LOG_OUT' })
                                        router.push('/', { scroll: false })
                                    }}>
                                        <ListItemText primary='Wyloguj' />
                                    </ListItemButton>
                                </ListItem> : (
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => router.push('/admin', { scroll: false })}>
                                            <ListItemText primary='Go To Admin Panel' />
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </AccordionDetails></div>) : (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => router.push('/signup', { scroll: false })}>
                                <Button variant='contained' fullWidth >Log In</Button>
                            </ListItemButton>
                        </ListItem>
                    )}
                </CustomAccordion>
                {menu.map(({ title, link }) => (
                    <ListItem key={title} disablePadding>
                        <ListItemButton onClick={() => router.push(link, { scroll: false })}>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* <Switch
                checked={globalState.darkMode}
                onChange={onSwitchDarkMode}
                inputProps={{ 'aria-label': 'controlled' }}
            /> */}
        </Box>
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