import styles from './Products.module.css';

export const ProductForm = (properties) => {

    const {productId, productName, productDescription} = properties;

    return (
        <div className={styles.product_element} >
            <h2>ID: {productId} </h2>
            <h3>Name: {productName}</h3>
            <p>{productDescription}</p>
        </div>
    )


}