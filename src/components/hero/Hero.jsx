import './hero.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const onChange = () => {
    navigate('/products'); // Update the navigation path to your desired destination
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to My React Store</h1>
        <Button className="hero-button" onClick={onChange}>
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default Hero;
