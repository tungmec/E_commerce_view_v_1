import styles from './Products.module.css';
import {getAuth} from '../../AuthProvider';
import {addVariantToCartByCartId} from '../../Util/ServerConnect.js';

export const VariantForm = (properties) => {
    const {sku, variant_name, attributes, price, is_active, variantId} = properties;
    const active = is_active? "Yes" : "No";
    const {haveActiveCart, activeCartId} = getAuth();

    const handleAddVariantToCart = async() => {
        const addOK = await addVariantToCartByCartId(activeCartId, variantId, 1);
        if (addOK) {
            alert(` Add ${variant_name} to cart`)
        } else {
            alert("Fail to add item to cart");
        }
    }


    return (
        <div className={styles.variant}>
            <h5>SKU: {sku} </h5>
            <h5>Variant name: {variant_name} </h5>
            <h5>Attributes: </h5>
            <div className={styles.attributes}> 
                <ul>
                    <li>OS: {attributes.os}</li>
                    <li>Color: {attributes.color}</li>
                    <li>AI package: {attributes.ai_package}</li>
                    <li>Accessories: {attributes.accessories}</li>
                </ul>
               
            </div>
            <h5>Price: <em>{price}</em>  </h5>
            <p>Active: {active}  </p>

            {
                (haveActiveCart) && <div>
                    <button onClick={handleAddVariantToCart}>Add to Cart</button>
                </div>

            }
        </div>
    )

}