'use client';
import { Button, Container, IconButton, Switch } from '@mui/material';
// import HelpIcon from '../Icons/Help';
import Drawer from '../Drawer';
import { useUserStore } from '@src/store/useUserStore';
import { useAppStore } from '@src/store';
// import { useEventSwitchDarkMode } from '../../hooks';
import LogoIcon from '../Icons/Logo';
import styles from './page.module.css';

const Header = () => {
    // const onSwitchDarkMode = useEventSwitchDarkMode();
    const [state] = useAppStore();
    const { theme } = useUserStore();
    const isDarkTheme = theme === 'dark';

    if (state.isAdmin) return null

    return (
        <header>
            <Container>
                <div className={styles.header}>
                    <Button href="/" onClick={() => window?.location?.reload()}>
                        <LogoIcon />
                    </Button>
                    <div className={styles.iconsGroup}>
                        {/* <Switch
                            checked={state.darkMode}
                            onChange={onSwitchDarkMode}
                            inputProps={{ 'aria-label': 'controlled' }}
                        /> */}
                        <nav>
                            <Drawer isDarkTheme={isDarkTheme} />
                        </nav>
                    </div>
                </div>
            </Container>
        </header>

    )
};

export default Header;