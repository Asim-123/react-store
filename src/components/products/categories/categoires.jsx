import React, { useEffect, useState } from "react";
import './categories.scss';

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories', { method: 'GET' });
      const data = await response.json();
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryName) => {
    onSelectCategory(categoryName);
  };

  return (
    <div className="categories-container">
      {categories.map(category => (
        <div className="category-card" key={category.id} onClick={() => handleCategorySelect(category.name)}>
          <ul>
            <li>{category.name}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Categories;
