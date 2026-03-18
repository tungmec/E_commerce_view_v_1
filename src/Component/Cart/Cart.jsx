import {getAuth} from '../../AuthProvider';
import { useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {loadVariantsByCartId, createNewCart} from '../../Util/ServerConnect.js';
import {formatVND} from '../../Util/format.js';
import {VariantForm} from './VariantsInCart';

import styles from './Cart.module.css';

export const Cart = () => {
    const [variants, setVariants] = useState([]);
    const [isEmptyCart, setIsEmptyCart] = useState(true);
    
    const [cartTotal, setCartTotal] = useState(0);
    const navigate = useNavigate();
                
    const {checkAuth , carts, authenticated, haveActiveCart, activeCartId} = getAuth();  
    //  Back to Home when not authenticated:

    useEffect(() => {
            if (!authenticated) {
            navigate("/");
    }
    },[]) 

    // ----------------
    // let haveActiveCart = false;
    // if (!carts || carts === null || carts === undefined){
    //      haveActiveCart = false;
        
    // } else {
        
    //     carts.forEach((cart) => {
    //         if (cart.status === "active") {
    //             haveActiveCart = true;
    //         }
    //     })
    // }
    // -----------------
    const handleChoiceCart = async (cartID) => {
        const loadedVariants = await loadVariantsByCartId(cartID);
       
       

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
                        (!isEmptyCart) && <div className={styles.variant_list} >
                        {variants.map((variant) => {
                        return <VariantForm 
                                item_id = {variant.item_id}
                                variant_id = {variant.variant_id}
                                variant_name = {variant.variant_name}
                                sku = {variant.sku}
                                attributes = {variant.attributes}
                                price = {variant.price}
                                quantity = {variant.quantity}
                             />
                        })} 
                        </div>
                      
                    }

                    {
                        (isEmptyCart) && <div className={styles.variant_list} >
                            <h2>Nothing in cart</h2>
                        </div>
                      
                    }
                    <h2>Total: {formatVND(cartTotal)} </h2>
                </div>
            </div>              

        </div>    
  
    ) 
}