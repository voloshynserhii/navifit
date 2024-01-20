'use client';

import { useState } from 'react';
import { Container } from '@mui/material';
import MenuIcon from '../Icons/Menu';
import HelpIcon from '../Icons/Help';
import { iconDarkColor, iconLightColor } from '../../app/utils/consts';
import { useUserStore } from '@src/store/useUserStore';
import styles from './page.module.css';

const Header = () => {
    const { theme } = useUserStore();
    const isDarkTheme = theme === 'dark';

    return (
        <Container>
            <div className={styles.header}>
                <p>NAVIFIT</p>
                <div className={styles.iconsGroup}>
                    <HelpIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                    <MenuIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                </div>
            </div>
        </Container>
    )
};

export default Header;