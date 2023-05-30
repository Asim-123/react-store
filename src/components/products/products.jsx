import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProducts } from '../../store/slices/productsSlice';
import { Image, Button, message, Pagination, Spin } from 'antd';
import Categories from './categories/categoires';
import './products.scss';
import { addToCart } from '../../store/slices/cartSlice';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.register.user);
  const cartItems = useSelector(state => state.cart);
  console.log("cartItems==", cartItems);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const onChange = (product) => {
    if (!user) {
      message.error('Please Login');
    } else if(cartItems.includes(product)) {
    message.warning("product already added")
    }
     else {
      dispatch(addToCart(product));
      message.success('Added to cart');
    }
  };

  const fetchProducts = useCallback(async (selectedCategory) => {
    try {
      setLoading(true);
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      if (response.ok) {
        const products = await response.json();
        setLoading(false);
        dispatch(getProducts(products));
        if (selectedCategory) {
          setData(products.filter(product => product.category.name === selectedCategory));
        } else {
          setData(products);
        }
      } else {
        throw new Error('Error fetching products');
      }
    } catch (err) {
      message.error(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [fetchProducts, selectedCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  return (
    <>
      <h1>Products</h1>
      <div className='product-container'>
        <div className='category'>
          <Categories onSelectCategory={setSelectedCategory} />
        </div>
        <div className='products'>
          {loading ? (
            <Spin  />
          ) : paginatedData.map(product => (
            <div className='product-item' key={product.id}>
              <Image width={300} src={product.images} />
              <h1>{product.title}</h1>
              <h2>Price: {product.price}</h2>
              <p>{product.description}</p>
              <h2>Category: {product.category.name}</h2>
              <Button onClick={() => onChange(product)}>Add To cart</Button>
            </div>
          ))}
        </div>
      </div>

      <div className='pagination'>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={data.length}
          onChange={handlePageChange}
        />
      </div>

    </>
  );
};

export default Products;
