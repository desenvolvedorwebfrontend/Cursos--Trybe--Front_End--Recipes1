import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import '../CSS/DoneMealCard.css';

function DoneMealCard({ recipe, index, linkShared, shareLink }) {
  return (
    <div key={ recipe.name } className="meal-card">
      <div>
        <Link
          to={
            recipe.type === 'comida'
              ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`
          }
        >
          <img
            src={ recipe.image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
            width="100px"
            className="food-img"
          />
        </Link>
      </div>
      <div className="recipe-names">
        <h4
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category}` }
        </h4>
        <Link
          to={
            recipe.type === 'comida'
              ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`
          }
        >
          <h1 data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </h1>
        </Link>
      </div>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipe.doneDate }
      </p>
      <div className="recipe-card-buttons">
        <button
          type="button"
          onClick={ () => shareLink(recipe.id, recipe.type) }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="compartilhar"
          />
        </button>
        { linkShared && <p>Link copiado!</p> }
      </div>
      { recipe.tags.map((tag, tagIndex) => (
        <p
          data-testid={ `0-${tag}-horizontal-tag` }
          key={ tagIndex }
        >
          { tag }
        </p>
      )) }
      <p
        data-testid={ `${index}-${recipe.type}-horizontal-tag` }
      >
        { recipe.type }
      </p>
    </div>
  );
}

DoneMealCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  linkShared: PropTypes.bool.isRequired,
  shareLink: PropTypes.func.isRequired,
};

export default DoneMealCard;