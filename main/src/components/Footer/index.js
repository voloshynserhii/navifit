'use client';

import Link from 'next/link';
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
        <Container disableGutters maxWidth={false}>
            <div className={styles.footer}>
                <div className={styles.iconsContainer}>
                    <Link href="https://facebook.com">
                        <FacebookIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                    </Link>
                    <Link href="https://instagram.com">
                        <InstagramIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                    </Link>
                    <Link href="https://youtube.com">
                        <YoutubeIcon fillColor={isDarkTheme ? iconDarkColor : iconLightColor} />
                    </Link>
                </div>
                <Typography variant="h6">
                    © {new Date().getFullYear()} navifit.pl
                </Typography>
            </div>
        </Container>
    )
}

export default Footer;