'use client';

import Link from 'next/link';
import { Container } from '@mui/material';
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
        <div className={styles.headerContainer}>
            <Container>
                <div className={styles.header}>
                    <Link href="/">
                        <LogoIcon />
                    </Link>
                    <div className={styles.iconsGroup}>
                        <HelpIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                        <Drawer isDarkTheme={isDarkTheme} />
                    </div>
                </div>
            </Container>
        </div>

    )
};

export default Header;