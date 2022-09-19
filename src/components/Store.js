import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Product from './shared/Product';
import Loader from './shared/Loader';

// redux
import { fetchProducts } from '../redux/products/productsAction';

// Style
import styles from "./Store.module.css";

//icon 
const Store = () => {

    const dispatch = useDispatch();
    const productsState = useSelector(state => state.productsState)
    const [search,setSearch] = useState("")
    useEffect(() => {
       dispatch(fetchProducts())
    }, [])
    const searchedProduct = productsState.products.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        item.description.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className={styles.container}>
            <input type="text" value={search} onChange={(event)=> setSearch(event.target.value)} placeholder="Search Anything"/>
            {productsState.loading ? 
                <Loader /> :
                productsState.error ?
                    <p>Somethin went wrong</p> :
                    <div className={styles.storeSection}>
                        {searchedProduct.map(product => <Product
                                key={product.id}
                                productData={product}
                            />)}
                    </div>
            }
        </div>
    );
};

export default Store;