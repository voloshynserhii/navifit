import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation'
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppStore } from '../../store';
import MenuIcon from '../Icons/Menu';
import { iconDarkColor, iconLightColor } from '../../utils/consts';

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

export default function SwipeableTemporaryDrawer({ isDarkTheme = false }) {
    const [globalState, dispatch] = useAppStore();
    const { isAuthenticated } = globalState;
    const router = useRouter();
    const [state, setState] = useState({
        right: false,
    });

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
                        <>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Moje Konto
                            </AccordionSummary>
                            <AccordionDetails>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => router.push('/account/plan', { scroll: false })}>
                                        <ListItemText primary='Mój plan posiłków' />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => router.push('/account/subscription', { scroll: false })}>
                                        <ListItemText primary='Moja subskrypcja' />
                                    </ListItemButton>
                                </ListItem>
                            </AccordionDetails></>) : (
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
        </Box>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(anchor, true)}>
                        <MenuIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
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