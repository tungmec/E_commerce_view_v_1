import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import { getAuth } from '../../AuthProvider.jsx';
import styles from './Home.module.css';
import {loginUser} from '../../Util/ServerConnect.js';

export const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {checkAuth} = getAuth();

   
    // All function

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    // ---

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    // ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginOK = await loginUser(username, password);
        if (loginOK) {
            setPassword("");
            setUsername("");
            await checkAuth();
            navigate("/");
        } else {
            alert("Fail to login")
        }

    }

    // ------------------------
    return (
        <div >
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="username"> 
                    Username:  
                </label>   

                <input type="text" id='username' name='username'
                    value={username} onChange={handleUsernameChange}
                />
              
           
                <label htmlFor="password">
                    Password:  
                </label>

                <input type='password' id='password' name='password'
                        value={password} onChange={handlePasswordChange}
                />

             

                <button type='submit' className={styles.button}>Login</button>
            </form>
            <br />

           
        </div>
    )
}