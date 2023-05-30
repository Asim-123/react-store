import React from 'react';
import 'antd/dist/reset.css';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Appheader';
import { About } from './components/about/About';
import Products from './components/products/products';
import Hero from './components/hero/Hero';
import store from './store/store';
import Cart from './components/cart/cart';
import Upload from './components/upload/upload';
import './App.css';
import { message } from 'antd';

const ProtectedRoute = ({ path, element }) => {
  const user = useSelector(state => state.register.user);

  if (!user) {
    message.warning('Please login');
    return <Navigate to="/" />;
  }

  return element;
};

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/upload" element={<ProtectedRoute element={<Upload />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
