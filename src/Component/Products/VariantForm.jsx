import styles from './Products.module.css';

export const VariantForm = (properties) => {
    const {sku, variant_name, attributes, price, is_active} = properties;
    const active = is_active? "Yes" : "No";
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
        </div>
    )

}