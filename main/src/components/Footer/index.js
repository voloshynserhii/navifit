'use client';

import Link from 'next/link';
import { Container, IconButton, Typography } from '@mui/material';
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
        <Container disableGutters maxWidth={false}>
            <footer className={styles.footer}>
                <div className={styles.iconsContainer}>
                    <IconButton href="https://facebook.com">
                        <FacebookIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                    </IconButton>
                    <IconButton href="https://instagram.com">
                        <InstagramIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                    </IconButton>
                    <IconButton href="https://youtube.com">
                        <YoutubeIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                    </IconButton>
                </div>
                <Typography variant="h6">
                    © {new Date().getFullYear()} navifit.pl
                </Typography>
            </footer>
        </Container>
    )
}

export default Footer;