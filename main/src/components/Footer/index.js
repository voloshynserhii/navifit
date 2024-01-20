'use client';

import { Container, Typography } from '@mui/material';
import FacebookIcon from '../Icons/Facebook';
import InstagramIcon from '../Icons/Instagram';
import YoutubeIcon from '../Icons/Youtube';
import { iconDarkColor, iconLightColor } from '../../app/utils/consts';
import { useUserStore } from '@src/store/useUserStore';

import styles from './page.module.css'

const Footer = () => {
    const { theme } = useUserStore();
    const isDarkTheme = theme === 'dark';
    
    return (
        <Container className={styles.footer}>
            <div className={styles.iconsContainer}>
                <FacebookIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                <InstagramIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                <YoutubeIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
            </div>
            <Typography variant="h6">
                © {new Date().getFullYear()} navifit.pl
            </Typography>
        </Container>
    )
}

export default Footer;