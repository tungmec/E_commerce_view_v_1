import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import styles from './Home.module.css';
import {createUser, loginUser} from '../../Util/ServerConnect.js';


export const Home = () => {
    const [login, setLogin] = useState(false);
    const [create, setCreate] = useState(false);
    const [createName, setCreateName] = useState("");
    const [createPass, setCreatePass] = useState("");
    const navigate = useNavigate();
    // Action when click Login button
    const loginHandle = () => {
        setCreate(false);
        setLogin(true);
        navigate("/", {replace: true});
    };
    
    // Action when click Create 
    const createHanle = () => {
        setLogin(false);
        setCreate(true);
        navigate("/", {replace: true});
    }
    // Action when click Back in any form
    const backHanle = () => {
        setLogin(false);
        setCreate(false);
        navigate("/", {replace: true});
    }
    // Action when change User name in Create form:
    const createNameChangeHandle = (e) => {
        setCreateName(e.target.value);
    }
    // Action when change Password in Create form:
    const createPassChangeHandle = (e) => {
        setCreatePass(e.target.value);
    }
    // Action when Submit in Create form:
    const createSubmitHandle = async (e) => {
        e.preventDefault();
        
        const createOK = await createUser(createName, createPass);
        if (createOK) {
            setCreateName("");
            setCreatePass("");
            setLogin(true);
            setCreate(false);
            navigate("/", {replace: true});
        } else {
            alert("Creating fault");
        }
    }


    // render part:
    if (!login && !create) {
        return (
                <>
                <div className = {styles.container} >
                    <button className = {styles.button} onClick={createHanle}>
                        Create new User
                    </button>
                    <br/>
                    <h2>OR</h2>
                    <br/>
                    <button className = {styles.button} onClick={loginHandle}>
                        Login
                    </button>
                </div>
                </>
                )
    } else if (login) {
        return (
            <div>
                <form action="">
                    <label htmlFor="loginName">User name:  </label>
                    <input id='loginName' name='loginName' type="text"  />
                    <br />
                    <label htmlFor="loginPassword">Password:   </label>                   
                    <input id='loginPassword'  name='loginPassword'  type="password" />
                </form>
                <br />
                <button onClick={backHanle}>
                    Back
                </button>
            </div>
        )
    } else if (create) {
        return (
            <div>
               
                <form  onSubmit={createSubmitHandle}>
                    <label htmlFor='username'>User name:   </label>
                    <input name='username' id='username'
                           type="text" value={createName} onChange={createNameChangeHandle} />
                    <br />
                    <label htmlFor='password'>Password:   </label>
                        
                    <input name="password" id="password" 
                           type="password" value={createPass} onChange={createPassChangeHandle}/>                           
                    <br />
                    <button type="submit" >Create</button>
                </form>
               <br />
                <button onClick={backHanle}>
                    Back
                </button>
            </div>
        )
    };
    
}