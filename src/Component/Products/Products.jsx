import {readAllCategories, loadProductsByCategoryName} from '../../Util/ServerConnect.js';
import {useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Products.module.css';
import { ProductForm } from './ProductForm.jsx'; './ProductForm'

export const  Products = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    // All functions:
    // Load all categories from API server function:
    const getCategories = async () => {
        const data = await readAllCategories();
        if (data === null) {
            return [];
        } else {
            return data;
        }
    }
  
    // Load products by select Category function :
    
    // ---------------
    //  Load categories at render moment:
    useEffect(
        () => {
            const loadCategories = async () => {
                const categoriesArray = await getCategories()
                setCategories(categoriesArray);
            };

            loadCategories();
            navigate("/products");
            
        },
        []);
    
    useEffect(()=>{
        const loadData = async () => { 
            const data = await loadProductsByCategoryName(categoryName);
            setProducts(data);
        };

        if (categoryName !==""){
           console.log(categoryName);
           loadData();
           
        }
        
    }, 
    [categoryName]);

    return (
        <>
            <div className={styles.container}>
               
                <div className={styles.categories_select}>
                    <label htmlFor="categories">Choice a Category:</label>
                    <select 
                        name="categories" 
                        id="categories" 
                        value={categoryName}
                        onChange={(e) => { setCategoryName(e.target.value)}}
                        className={styles.select}
                    >

                        <option value="" className={styles.option}>---choice here---</option>
                        <option value="all">All</option>


                        {
                            categories.map((category) => (
                                <option 
                                    key={category.id} 
                                    value={category.category_name}
                                    >
                                        {category.category_name} : {category.category_description}
                                </option>
                            ))
                        }
                    </select>

                </div>

                <div className={styles.products}>
                        {
                            products.map((product) => {
                              return (
                                   
                                         <ProductForm 
                                            productId = {product.id}
                                            productName = {product.item_name}
                                            productDescription = {product.item_description}
                                        />                                                                
                                )
                            })
                        }
                </div>
            </div>
            
        </>
    )
}