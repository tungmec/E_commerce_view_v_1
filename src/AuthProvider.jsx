import { useState, useEffect, createContext, useContext, use} from 'react';
import {loadAllCartsByUserId} from './Util/ServerConnect.js';
const AuthContext = createContext(null);
const API_URL = "http://localhost:3000";
export const AuthProvider = ({children}) => {
    const [authLoading, setAuthLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [carts, setCarts] = useState([]);

    // Check authenticate by request API: GET /auth/me :
    const checkAuth = async () => {

            setAuthLoading(true);
            console.log("Run get auth");
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    method: 'GET',
                    credentials: "include",
                });

                if (!response.ok) {
                    setAuthenticated(false);
                    setUser(null);
                    console.log("f");
                    return false;

                };
                
                const data = await response.json();
                setAuthenticated(true);
                setUser(data.user);
               
                const userId = data.user.id;
                console.log(userId);
                const loadedCarts = await loadAllCartsByUserId(userId);
                setCarts(loadedCarts);
               
              
               
                
                return true;
            } catch(err) {
                setAuthenticated(false);
                setUser(null);
                console.log(`Fault`);
                return false;
            } finally {
                setAuthLoading(false);
            }
    };

   
    // useEffect for check auth any  render time:
    useEffect( () => {
        checkAuth();
        
    },[]);


    // Create  context provider:
    return (
        <AuthContext.Provider
            value={
               { authLoading,
                authenticated,
                user,
                carts,
                setAuthLoading,
                setAuthenticated,
                checkAuth}
            } >
            {children}
        </AuthContext.Provider>
    );
    

    };

    export const getAuth = () => {
        return useContext(AuthContext);
    };