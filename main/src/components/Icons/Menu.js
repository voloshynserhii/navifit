import styles from './icons.module.css';

export default function Menu({ fillColor = "#CCFF33" }) {
    return (
        <div className={styles.icon}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.41455 11.7712V10.2998H29.4288V11.7712H4.41455ZM29.4288 17.6569V19.1284H9V17.6569H29.4288ZM4.41455 25.0141H29.4288V26.4855H4.41455V25.0141Z" fill={fillColor} />
                <path d="M4.41455 11.7712V10.2998H29.4288V11.7712H4.41455ZM29.4288 17.6569V19.1284H9V17.6569H29.4288ZM4.41455 25.0141H29.4288V26.4855H4.41455V25.0141Z" fill="black" fill-opacity="0.2" />
            </svg>
        </div>
    );
};