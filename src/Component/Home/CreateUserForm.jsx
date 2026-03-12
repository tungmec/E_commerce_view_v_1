import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import { getAuth } from '../../AuthProvider.jsx';
import styles from './Home.module.css';
import {createUser} from '../../Util/ServerConnect.js'


export const CreateUserForm = () => {
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

        const createOK = await createUser(username, password);
        if (createOK) {
            setUsername("");
            setPassword("");
            await checkAuth();
            navigate("/");

        } else {
            alert("Fail to create new user !");
        }
        
    }

    // ------------------------
   
    return (
        <div >
            <form className={styles.form}  onSubmit={handleSubmit}>
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

                <button type='submit'  className={styles.button}>Create new User</button>
            </form>
            <br />

           
        </div>
    )
}