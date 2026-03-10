import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
export const Nav = () => {
    return (
        <div className={styles.nav}>
            <NavLink to='/' 
            className={({isActive}) => `${styles.nav_component} ${isActive ? styles.active_component : ""}`}
            >
                Home
            </NavLink>

            <NavLink to='/Products' 
             className={({isActive}) => `${styles.nav_component} ${isActive ? styles.active_component : ""}`}
            >
                Products
            </NavLink>
        </div>
            
    )
}