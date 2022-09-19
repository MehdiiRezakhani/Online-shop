import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
// Components
import Store from './components/Store';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/shared/Navbar';
import ShopCart from './components/ShopCart';
import Footer from './components/shared/Footer';
// Redux
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/products/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Store/>} />
          <Route path="/cart" element={<ShopCart/>} />
          <Route path="/*" element={<Navigate to="/products"/>}/>
        </Routes>
        <Footer/>
    </Provider>
  );
}

export default App;
