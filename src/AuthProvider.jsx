import { useState, useEffect, createContext, useContext, use} from 'react';
import {loadAllCartsByUserId, API_URL} from './Util/ServerConnect.js';
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [authLoading, setAuthLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [carts, setCarts] = useState([]);
    const [haveActiveCart, setHavActiveCart] = useState(false);
    const [activeCartId, setActiveCartId] = useState(null);


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
               
                // check for active cart:
                // let tempHaveActive = false;
                if (!loadedCarts || loadedCarts === null 
                    || loadedCarts === undefined || loadedCarts.length ===0) {
                    
                    setHavActiveCart(false);
                    setActiveCartId(null);
                    console.log(haveActiveCart);
                } else {
                    loadedCarts.forEach((cart) => {
                        if (cart.status === "active") {
                            setHavActiveCart(true);
                            setActiveCartId(cart.id);
                            console.log(haveActiveCart);
                            console.log(activeCartId);

                        }
                    })
                }

               
               
                
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
                haveActiveCart,
                activeCartId,
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