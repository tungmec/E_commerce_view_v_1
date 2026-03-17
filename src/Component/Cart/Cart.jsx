import {getAuth} from '../../AuthProvider';
import {useAsyncError, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {loadVariantsByCartId} from '../../Util/ServerConnect.js';
import {formatVND} from '../../Util/format.js';
import {VariantForm} from './VariantsInCart';

import styles from './Cart.module.css';

export const Cart = () => {
    const [variants, setVariants] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const navigate = useNavigate();
    const {user, carts} = getAuth();  


    // -----------------
    const handleChoiceCart = async (cartID) => {
        const loadedVariants = await loadVariantsByCartId(cartID);
       
        setVariants(loadedVariants);      
        let calTotal = 0;
        loadedVariants.forEach((variant) => calTotal+= Number(variant.quantity) * Number(variant.price))
        setCartTotal(calTotal);

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
                                
                                onMouseDown = {async() => await handleChoiceCart(cart.id)}
                            >
                                <h4><strong>Cart ID : {cart.id}</strong></h4>
                                <p>Status: {cart.status} </p>
                            </div>
                        )
                    })}
                </div>

                <div className={styles.cart_detail}> 
                    <div className={styles.variant_list} >
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
                    <h2>Total: {formatVND(cartTotal)} </h2>
                </div>
            </div>              

        </div>    
  
    ) 
}