import { useState, Fragment } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, IconButton, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '../Icons/Menu';
import { iconDarkColor, iconLightColor } from '../../utils/consts';

const CustomAccordion = styled((props) => (
    <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: 'none',
    '&::before': {
        display: 'none',
    },
}));

export default function SwipeableTemporaryDrawer({ isDarkTheme = false }) {
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
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Moje Konto
                    </AccordionSummary>
                    <AccordionDetails>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary='Mój plan posiłków' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary='Moja subskrypcja' />
                            </ListItemButton>
                        </ListItem>
                    </AccordionDetails>
                </CustomAccordion>
                {['Sklep', 'O nas', 'Skontaktuj się z nami', 'Wsparcie', 'Warunki i zasady'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
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