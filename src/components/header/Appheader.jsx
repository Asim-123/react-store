import { useState } from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartOutlined } from '@ant-design/icons'
import Signup from '../register/signup/Signup';
import './header.scss';

const Header = () => {
  const user = useSelector(state => state.register.user)
  const cart = useSelector(state => state.cart)
  console.log(cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-header">
      <header>
        <Link to="/"><img src={logo} alt="logo" width={150} height={150} /></Link>
        <div className="menu-wrapper">
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </div>
          <nav className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              {user &&
                <li>
                  <Link to="/upload">Upload Products</Link>
                </li>}
              {user &&
                <li>
                  <Link to="/cart">Cart<ShoppingCartOutlined />{cart.length}</Link>
                </li>}
            </ul>
            <div>
              <Signup />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
