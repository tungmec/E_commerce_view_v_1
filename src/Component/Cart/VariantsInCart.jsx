import styles from './Cart.module.css';
import {formatVND} from '../../Util/format.js';
import {getAuth} from '../../AuthProvider';
import {updateQuantityOfVariantInCart} from '../../Util/ServerConnect.js';
import {useState, useEffect} from 'react';
import {useNavigate}  from 'react-router-dom';


export const VariantForm = ({variant, onPutNoUpdate, onClearNoUpdate}) => {
    const {cart_id, item_id, variant_id, variant_name, sku, attributes, price, quantity} = variant;
    const { activeCartId} = getAuth();
    const [variantQuantity, setVariantQuantity] = useState(quantity);
   
   


const handleCancel = () => {
    setVariantQuantity(quantity);
    onClearNoUpdate(variant_id);
}

const handleUpdate = async () => {
    const updateOK = await updateQuantityOfVariantInCart(activeCartId, variant_id, variantQuantity);
    onClearNoUpdate(variant_id);
    if (updateOK) {
        setVariantQuantity((prev) => prev+0);
        
    } else {
        alert("Fail to update");
        setVariantQuantity(quantity);
    }

    
   
}


// RENDER part:
    return (
        <div className={styles.variants} >
            <h3>Cart ID : {cart_id} </h3>
            <h3>ID : {variant_id} - SKU: {sku}  - Name: {variant_name} </h3>
            <ul>
                <li>OS : {attributes.os} </li>
                <li>Color : {attributes.color} </li>
                <li>AI package : {attributes.ai_package} </li>
                <li>Accessories : {attributes.accessories} </li>
            </ul>
            <p><strong> Base price : {formatVND(price)} </strong></p>
            <p><strong> Quantity :  </strong></p>
            <input 
                className={styles.input}
                type="number" 
                value={variantQuantity}
                min={1}
                max={999}
                step={1}
                required
                onChange={(e) =>{ 
                    const newValue = Number(e.target.value);
                    if (e.target.value > 0 && e.target.value <=999) {setVariantQuantity(newValue)}
                    else {setVariantQuantity(quantity)}
                    if (newValue !== quantity) {onPutNoUpdate(variant_id)} else {onClearNoUpdate(variant_id)}
                    }}        
                disabled={cart_id !== activeCartId}            
            />
               

               
                   
               

            <div className={styles.quantity_update}> 
               {(variantQuantity !== quantity && cart_id === activeCartId) && 
                    <button
                        onClick={handleUpdate}
                    >
                        Update
                    </button> }
               {(variantQuantity !== quantity && cart_id === activeCartId) && 
                    <button
                        onClick={handleCancel}
                    >
                        Cancel
                    </button> }
            </div>
            <p><strong> Base Total : {formatVND(quantity * price)} </strong></p>
        </div>
    )

}