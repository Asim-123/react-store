import React, { useState } from 'react';
import { Button, InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Modal } from 'antd';
import { increase, decrease } from '../../store/slices/counterSlice';
import { removeFromCart } from '../../store/slices/cartSlice';
import { DeleteOutlined } from '@ant-design/icons';
import './cart.scss';

const Cart = () => {
  const [productPrice] = useState({
    shipping: 100,
    tax: 50
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart);
  console.log("products", products);

  const onChange = (value, productId, price) => {
    if (value > count) {
      setCount(value);
      const newPrice = price * (value - count);
      dispatch(increase({ productId, value: value - count, newPrice }));
    } else if (value < count) {
      setCount(value);
      const newPrice = price * (count - value);
      dispatch(decrease({ productId, value: count - value, newPrice }));
    }
  };

  const handleRemove = (productId) => {
    console.log(productId);
    dispatch(removeFromCart(productId));
  };

  return (
    <div className='main'>
      {products.length === 0 ? (
        <div className='empty-cart'>No products in the cart</div>
      ) : (
        <>
          <div className='container'>
            {products.map(product => (
              <div key={product.id} className='cart'>
                <Image width={200} src={product.images} />
                <h1>{product.title}</h1>
                <h2>{product.description}</h2>
                <h1>{product.price}</h1>
                <h2>Total: {product.price * count}</h2>
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  value={count}
                  onChange={(value) => onChange(value, product.id, product.price)}
                />
                <Button onClick={() => handleRemove(product.id)}>
                  <DeleteOutlined />
                </Button>
              </div>
            ))}
          </div>
          <div className="checkout">
            <div className='checkout-details'>
              <span>Total: 100</span>
              <span>Tax: {productPrice.tax}</span>
              <span>Shipping: {productPrice.shipping}</span>
              <span>Grand Total: 5000</span>
              <Button onClick={showModal}>Checkout</Button>
            </div>
            <Modal title="React The Pawa" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <h1>It is a dummy project</h1>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
