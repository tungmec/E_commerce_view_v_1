import { useNavigate } from 'react-router-dom';
import {logoutUser} from '../../Util/ServerConnect.js';
import { getAuth } from '../../AuthProvider.jsx';

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
        <div>
            <h2>User name: {user.user_name}</h2>

            <br />
            
            <button onClick={handleLogout}>
                
                Logout
            </button>
        </div>
       
    )
}