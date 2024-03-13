import styles from './icons.module.css'

export default function Menu() {
    return (
        <div className={styles.menuIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M23 7C23 7.41421 22.6642 7.75 22.25 7.75L2.25 7.75C1.83579 7.75 1.5 7.41421 1.5 7C1.5 6.58579 1.83579 6.25 2.25 6.25L22.25 6.25C22.6642 6.25 23 6.58579 23 7Z" fill="#1C2227" />
                <path fillRule="evenodd" clipRule="evenodd" d="M23 18C23 18.4142 22.6642 18.75 22.25 18.75L2.25 18.75C1.83579 18.75 1.5 18.4142 1.5 18C1.5 17.5858 1.83579 17.25 2.25 17.25L22.25 17.25C22.6642 17.25 23 17.5858 23 18Z" fill="#1C2227" />
                <path fillRule="evenodd" clipRule="evenodd" d="M23 12.5C23 12.9142 22.4875 13.25 21.8553 13.25L9.64474 13.25C9.01252 13.25 8.5 12.9142 8.5 12.5C8.5 12.0858 9.01252 11.75 9.64474 11.75L21.8553 11.75C22.4875 11.75 23 12.0858 23 12.5Z" fill="#1C2227" />
            </svg>
        </div>
    );
}