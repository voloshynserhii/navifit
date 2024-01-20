'use client';

import Link from 'next/link';
import { Container } from '@mui/material';
import HelpIcon from '../Icons/Help';
import Drawer from '../Drawer';
import { iconDarkColor, iconLightColor } from '../../app/utils/consts';
import { useUserStore } from '@src/store/useUserStore';
import styles from './page.module.css';

const Header = () => {
    const { theme } = useUserStore();
    const isDarkTheme = theme === 'dark';

    return (
        <Container>
            <div className={styles.header}>
                <Link href="/">
                    NAVIFIT
                </Link>
                <div className={styles.iconsGroup}>
                    <HelpIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                    <Drawer isDarkTheme={isDarkTheme} />
                </div>
            </div>
        </Container>
    )
};

export default Header;