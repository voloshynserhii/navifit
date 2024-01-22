import styles from './icons.module.css'

export default function Arrow() {
    return (
        <div className={styles.iconContainer}>
            <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.0607 13.0607C32.6464 12.4749 32.6464 11.5251 32.0607 10.9393L22.5147 1.3934C21.9289 0.807611 20.9792 0.807611 20.3934 1.3934C19.8076 1.97919 19.8076 2.92893 20.3934 3.51472L28.8787 12L20.3934 20.4853C19.8076 21.0711 19.8076 22.0208 20.3934 22.6066C20.9792 23.1924 21.9289 23.1924 22.5147 22.6066L32.0607 13.0607ZM0 13.5H31V10.5H0V13.5Z" fill="black" />
            </svg>
        </div>
    );
}