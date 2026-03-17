import { useNavigate } from 'react-router-dom';
import {logoutUser} from '../../Util/ServerConnect.js';
import { getAuth } from '../../AuthProvider.jsx';
import styles from './Home.module.css';

export const UserProfileForm = () => {

    const navigate = useNavigate();
    const { user,  checkAuth } = getAuth();

     // Function:
    const handleLogout = async (e) => {
        e.preventDefault();
        const logoutOK = await logoutUser();
        if (logoutOK) {
            checkAuth();
            navigate("/");
        } else {
            alert("fail to logout");
        }
    }

    return (
        <div className={styles.profile_form}>
            <h2>User name: {user.user_name}</h2>
            <h2>User Id: {user.id}</h2>

            <br />
            
            <button onClick={handleLogout} className={styles.button}>
                
                Logout
            </button>
        </div>
       
    )
}