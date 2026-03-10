import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import styles from './Home.module.css';
import {createUser, loginUser, logoutUser} from '../../Util/ServerConnect.js';


export const Home = () => {
    const [login, setLogin] = useState(false);
    const [create, setCreate] = useState(false);
    const [logout, setLogout] =useState(false);
    const [createName, setCreateName] = useState("");
    const [createPass, setCreatePass] = useState("");
    const [loginName, setLoginName] = useState("");
    const [loginPass, setLoginPass] = useState("");
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
            setLogout(false);
            navigate("/", {replace: true});
        } else {
            alert("Creating fault");
        }
    }
    // Action when change user name in Login form:
    const loginNameChangeHandle = (e) => {
        setLoginName(e.target.value);
    }
    // Action when change pass in Login form:
    const loginPassChangeHandle = (e) => {
        setLoginPass(e.target.value);
    }
    
    // Action for submit Login form:
    const loginSubmitHandle = async (e) => {
        e.preventDefault();
        const loginOK = await loginUser(loginName, loginPass);
        if (loginOK) {
            setLoginName("");
            setLoginPass("");
            setCreate(false);
            setLogin(false);
            setLogout(true);
            navigate("/", {replace:true});
        }
    }

    // Action when click Logout:
    const logoutHandle = async () => {
        const logoutOK = await logoutUser();
        if (logoutOK) {
            setLogout(false);
            navigate("/", {replace:true});
        } else {
            alert("Logout fail");
        }
    }


    // -------------------------------------------

    // render part:
    if (!login && !create && !logout) {
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
                <form onSubmit={loginSubmitHandle} >
                    <label htmlFor="loginname">User name:  </label>
                    <input id='loginname' name='loginname' type="text"
                            value={loginName} onChange={loginNameChangeHandle} />
                    <br />
                    <label htmlFor="loginpassword">Password:   </label>                   
                    <input id='loginpassword'  name='loginpassword'  type="password"
                            value={loginPass} onChange={loginPassChangeHandle} />
                    <button type="submit" >Login</button>
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
    } else if (logout) {
        return (
            <div>
                <button onClick={logoutHandle}>Logout</button>
            </div>
        )
    };
    
}