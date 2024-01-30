'use client';

import { Button, Container, IconButton } from '@mui/material';
import HelpIcon from '../Icons/Help';
import Drawer from '../Drawer';
import { iconDarkColor, iconLightColor } from '../../app/utils/consts';
import { useUserStore } from '@src/store/useUserStore';
import LogoIcon from '../Icons/Logo';
import styles from './page.module.css';

const Header = () => {
    const { theme } = useUserStore();
    const isDarkTheme = theme === 'dark';

    return (
        <header className={styles.headerContainer}>
            <Container>
                <div className={styles.header}>
                    <Button href="/" onClick={() => window?.location?.reload()}>
                        <LogoIcon />
                    </Button>
                    <div className={styles.iconsGroup}>
                        <IconButton>
                            <HelpIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                        </IconButton>
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