import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Style
import styles from "./ProductDetails.module.css";
// Icons
import trashIcon from "../assets/icons/trash.svg"
//redux
import {addItem, removeItem, increase, decrease} from '../redux/cart/cartAction'
//functions
import {isInCart, quantityCount} from '../helper/functions';
const ProductDetails = (props) => {
    const Params = useParams();
    const Pid = Params.id
    const [data,setData] = useState({})
    useEffect(()=>{
           axios.get(`https://fakestoreapi.com/products/${Pid}`)
           .then(response => setData(response.data))
    },[]);
    const {id ,image, title, price, category, description} = data;
    const state = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    return (
        <div>
        {data ? 
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="product" />
                <div className={styles.textContainer}>
                    <h3>{title}</h3>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.category}><span>Category:</span> {category}</p>
                    <div className={styles.buttonBox}>
                        <span className={styles.price}>${price}</span>
                        <div className={styles.buttonContainer}>
                            {quantityCount(state, id) === 1 && <button className={styles.smallButton} onClick={() => dispatch(removeItem(data))}><img src={trashIcon} alt="trash" /></button>}
                            {quantityCount(state, id) > 1 && <button className={styles.smallButton} onClick={() => dispatch(decrease(data))}>-</button>}
                            {quantityCount(state, id) > 0 && <span className={styles.counter}>{quantityCount(state, id)}</span>}
                            {
                                isInCart(state, id) ?
                                <button className={styles.smallButton} onClick={() => dispatch(increase(data))}>+</button> :
                                <button onClick={() => dispatch(addItem(data))}>Add to Cart</button>
                            }
                         </div>
                    </div>
                </div>
            </div>
        : <p>Loading....</p> } 
        </div>
    );
};

export default ProductDetails;