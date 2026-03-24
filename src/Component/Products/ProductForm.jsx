import styles from './Products.module.css';
import {useState, useEffect} from 'react';
import {loadVariantsByProductId} from '../../Util/ServerConnect.js';
import {formatVND} from '../../Util/format.js';
import {VariantForm} from './VariantForm';


export const ProductForm = (properties) => {
    const [variants, setVariants] = useState([]);
    const {productId, productName, productDescription} = properties;
    
    // Load Variants data at render:

    useEffect(() => {
        const loadData = async () => {
            const data = await loadVariantsByProductId(productId);            
            setVariants(data);
        }
        loadData();
    },
    [])

    return (
        <div className={styles.product_element} >
            <h2>ID: {productId} </h2>
            <h3>Name: {productName}</h3>
            <p>{productDescription}</p>

            <div className={styles.variants}> 
                {
                    variants.map((variant) => {
                       return (
                        <VariantForm 
                            key={variant.id}
                            variantId = {variant.id}
                            sku={variant.sku}
                            variant_name={variant.variant_name}
                            attributes={variant.attributes}
                            price={formatVND(variant.price)}
                            is_active={variant.is_active}                        
                        />
                        )
                    })
                }

            </div>
        </div>
    )


}