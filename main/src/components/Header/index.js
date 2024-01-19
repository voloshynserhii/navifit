'use client';

import { useState } from 'react';
import MenuIcon from '../Icons/Menu';
import HelpIcon from '../Icons/Help';
import { iconDarkColor, iconLightColor } from '../../app/utils/consts';
import styles from './page.module.css';

const Header = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    
    return (
        <div className={styles.header}>
            <p>NAVIFIT</p>
            <div className={styles.iconsGroup}>
                <HelpIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                <MenuIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
            </div>

        </div>
    )
};

export default Header;