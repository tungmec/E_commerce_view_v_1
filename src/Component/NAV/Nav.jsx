import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import {getAuth} from '../../AuthProvider'
export const Nav = () => {
    const { authenticated } = getAuth()
    const homeName = authenticated? " User Profile" :  "Create user / Login";

    return (
        <div className={styles.nav}>
            
            { authenticated && 
                <div>
                    <NavLink 
                        to='/Products' 
                        className={({isActive}) => `${styles.nav_component} ${isActive ? styles.active_component : ""}`}
                    >
                        Products
                    </NavLink>

                    <NavLink 
                         to='/Cart' 
                        className={({isActive}) => `${styles.nav_component} ${isActive ? styles.active_component : ""}`}
                    >
                        Cart
                    </NavLink>
                    
                    <NavLink 
                         to='/Orders' 
                        className={({isActive}) => `${styles.nav_component} ${isActive ? styles.active_component : ""}`}
                    >
                        Orders
                    </NavLink>

                </div>
                
            }

            <NavLink 
                to='/' 
                className={({isActive}) => `${styles.nav_component} ${isActive ? styles.active_component : ""}`}
            >
                {homeName}
            </NavLink>
           
        </div>
            
    )
}