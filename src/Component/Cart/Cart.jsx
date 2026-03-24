import {getAuth} from '../../AuthProvider';
import { useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {loadVariantsByCartId, createNewCart, checkoutActiveCartById} from '../../Util/ServerConnect.js';
import {formatVND, formatVNtime} from '../../Util/format.js';
import {VariantForm} from './VariantsInCart';

import styles from './Cart.module.css';

export const Cart = () => {
    const [variants, setVariants] = useState([]);
    const [isEmptyCart, setIsEmptyCart] = useState(true);
    const [notUpdateArray, setNotUpdateArray] = useState([]);
    const [choiceId, setChoieId] = useState(null);
    const [cartTotal, setCartTotal] = useState(0);
    
    const navigate = useNavigate();
                
    const { checkAuth , carts, authenticated, haveActiveCart, activeCartId} = getAuth();  
    //  Back to Home when not authenticated:

    useEffect(() => {
            if (!authenticated) {
            navigate("/");
    }
    },[]); 

    useEffect (() => { console.log("noUpdate array:", notUpdateArray)}, [notUpdateArray]);

// set / clear  for changed but noupdate of all variant in cart 
    const handleAddNotUpdate = (addValue) => {
        
        const index = notUpdateArray.indexOf(addValue);
        if (index === -1) {
            setNotUpdateArray((prev) => [...prev, addValue])
        }
        
    }

    const handleRemoveNoUpdate = (removeValue) => {
        
        setNotUpdateArray((prev) => prev.filter((value) => value !== removeValue));
    }


// choice cart in list:
    const handleChoiceCart = async (cartID) => {
        const loadedVariants = await loadVariantsByCartId(cartID);
        setChoieId(cartID);
         
        //  Check for empty ofcurrent cart detail :
        if (!loadedVariants || loadedVariants === null 
            || loadedVariants==undefined || loadedVariants.length === 0) {
                setIsEmptyCart(true);
                setCartTotal(0);
            } else {
                setVariants(loadedVariants);      
                let calTotal = 0;
                loadedVariants.forEach((variant) => calTotal+= Number(variant.quantity) * Number(variant.price))
                setCartTotal(calTotal);
                setIsEmptyCart (false);
              
            }        
    }
   
    //  Handle Create new cart (set active default):
    const handleCreateNewCart = async () => {
        const createOK = await createNewCart();
            if (createOK) {
                await checkAuth();
            }
        
    }

    const handleCheckOut = async () => {
        const checkoutOK = await checkoutActiveCartById(activeCartId);
        if (checkoutOK) {
            await checkAuth();
        } else {
            alert("Check out fail");
        }
    }
// RENDER part:
    
    return (
        <div className={styles.cart_form} >
            <div className={styles.cart_container}>
                           
                <div className={styles.cart_list}> 
                    
                    {carts.map((cart) => {
                        let cartStyle; 
                        if (cart.status === 'active') {
                            cartStyle = styles.active
                        } else {
                            cartStyle = styles.checked_out
                        }
                       
                        return (
                            <div 

                                className={`${styles.cart_infor} ${cartStyle}`} 
                                key = {cart.id}
                                
                                onMouseDown = {async() => await handleChoiceCart(cart.id)}
                            >
                                <h4><strong>Cart ID : {cart.id}</strong></h4>
                                <p>Status: {cart.status} </p>
                                <p>Create at: {formatVNtime(cart.created_at)} </p>
                            </div>
                        )
                    })}

                    {
                        (!haveActiveCart) && 
                            <button 
                                className={styles.create_button}
                                onClick={handleCreateNewCart}
                            >
                                Create new Cart
                            </button>
                    }
                </div>

                <div className={styles.cart_detail}> 
                    {
                        (!isEmptyCart) && 
                        <div className={styles.variant_list} >
                            {variants.map((variant) => {
                            return ( 
                                    <div>
                                        <VariantForm 
                                    
                                        key={variant.variant_id}
                                        variant = {variant}
                                        onPutNoUpdate = {handleAddNotUpdate}
                                        onClearNoUpdate = {handleRemoveNoUpdate}
                                        /> 
                                    </div>
                                        
                                )
                            })} 

                            

                        </div>
                      
                    }

                    {
                        (isEmptyCart) && <div className={styles.variant_list} >
                            <h2>Nothing in cart</h2>
                        </div>
                      
                    }

                    <div className={styles.cart_footer} >
                        <h2>Total: {formatVND(cartTotal)} </h2>
                        {(notUpdateArray.length === 0 && haveActiveCart && 
                        choiceId === activeCartId && !isEmptyCart)? 
                                <button 
                                    onClick={handleCheckOut}
                                >
                                    Check Out
                                </button> : <h3>Can not Check out before update all change</h3> }
                        
                    </div>
                    
                </div>
            </div>              

        </div>    
  
    ) 
}