import MenuIcon from '../Icons/Menu';
import HelpIcon from '../Icons/Help';
import styles from './page.module.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <p>NAVIFIT</p>
            <div className={styles.iconsGroup}>
                <HelpIcon />
                <MenuIcon />
            </div>

        </div>
    )
};

export default Header;