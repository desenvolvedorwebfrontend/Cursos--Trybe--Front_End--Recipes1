import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getMealByArea } from '../services';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidasArea() {
  const { mealAreas, foods } = useContext(AppContext);
  const [areaValue, setAreaValue] = useState('Selecione uma opção');
  const [areaMeals, setAreaMeals] = useState([]);

  const fetchMeals = async (area) => {
    const response = await getMealByArea(area);
    setAreaMeals(response);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setAreaValue(value);
  };

  useEffect(() => {
    fetchMeals(areaValue);
  }, [areaValue]);

  const mealArray = areaMeals !== null ? areaMeals : foods;

  return (
    <>
      <Header title="Explorar Origem" searchIcon />
      <select
        data-testid="explore-by-area-dropdown"
        value={ areaValue }
        onChange={ handleChange }
      >
        <option disabled>Selecione uma opção</option>
        <option value="All">All</option>
        { mealAreas && mealAreas.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ strArea }
            value={ strArea }
          >
            {strArea}
          </option>
        )) }
      </select>
      { foods && mealArray.map((food, index) => (
        <Link key={ food.idMeal } to={ `/comidas/${food.idMeal}` }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ food.strMealThumb }
              alt={ food.strMeal }
              width="100px"
            />
            <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
          </div>
        </Link>
      )) }
      <Footer />
    </>
  );
}

export default ExplorarComidasArea;
