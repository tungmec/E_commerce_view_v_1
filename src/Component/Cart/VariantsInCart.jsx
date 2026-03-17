import styles from './Cart.module.css';
import {formatVND} from '../../Util/format.js';

export const VariantForm = (properties) => {
    const {item_id, variant_id, variant_name, sku, attributes, price, quantity} =properties;
 

    return (
        <div className={styles.variants} >
            <h3>ID : {variant_id} - SKU: {sku}  - Name: {variant_name} </h3>
            <ul>
                <li>OS : {attributes.os} </li>
                <li>Color : {attributes.color} </li>
                <li>AI package : {attributes.ai_package} </li>
                <li>Accessories : {attributes.accessories} </li>
            </ul>
            <p><strong> Base price : {formatVND(price)} </strong></p>
            <p><strong> Quantity : {quantity} </strong></p>
            <p><strong> Base Total : {formatVND(quantity * price)} </strong></p>
        </div>
    )

}