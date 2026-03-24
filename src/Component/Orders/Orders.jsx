import {useState, useEffect} from 'react';
import {getAuth} from '../../AuthProvider';
import {loadOrdersOfCurrentUser, loadItemsByOrderId} from '../../Util/ServerConnect.js';
import styles from './Orders.module.css';
import {formatVND} from '../../Util/format.js'

export const Orders = () => {
    const [orderList, setOrdersList] =useState([]);
    const [selectedId, setSelectedId] =useState(null);
    const [selectedTotalPrice, setSelectedTotalPrice] = useState(null);
    const [items, setItems] = useState([]);
    const {user, authenticated} = getAuth();



useEffect(() =>{
    const getOders = async () => {
        const loadedOrders = await loadOrdersOfCurrentUser();
        setOrdersList(loadedOrders)
    }

    getOders();
},[]);

// select order:
const handleSelectOrder = async (orderId, totalPrice) => {
    setSelectedId(orderId);
    setSelectedTotalPrice(totalPrice);
    const loadedItems = await loadItemsByOrderId(orderId);
    setItems(loadedItems);
   
}



    return (
        <div className={styles.orders_container} >

            <div className={styles.orders_list_form}>
                <h2>Orders List</h2>
                    <div className={styles.orders_list} >
                        {
                        
                        orderList.map((order) => {
                            const classNameBySelected = (order.id === selectedId) ? styles.selectedOrder :"";
                            return (
                                <div 
                                    key = {order.id}
                                    onMouseDown = {async () => await handleSelectOrder(order.id, order.total_price)}
                                    className={`${styles.order_in_list} ${classNameBySelected}`}
                                >
                                    <h3>{order.id} </h3>
                                    <p>User address: {order.shipping_address_snapshot.address} </p>
                                    <p>User email: {order.shipping_address_snapshot.email} </p>
                                </div>
                            )
                        })}
                    </div>
            </div>
                <div className={styles.items_list_container}>
                     <div className={styles.items_list} >
                        {items.map((item) => {
                            return (
                                <div className={styles.item} 
                                    key={item.variant_id}
                                >
                                    <h3>SKU: {item.sku} - Name:  {item.variant_name} </h3>
                                    <p>Unit price: {formatVND(item.unit_price)} </p>
                                    <p>Quantity: {item.quantity} </p>
                                    <p>Line Total: {formatVND(item.line_total)} </p>
                                </div>
                            )
                        })}

                       
               
                    </div>    

                    <div>
                        <h2>Total price: {formatVND(selectedTotalPrice)}</h2>
                    </div>             
                </div>
                 

        </div>
    )
}