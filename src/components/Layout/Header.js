import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsImage from '../../assets/food-table.png';
import mealsWebp from '../../assets/food-table.webp';
import classes from './Header.module.css';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>MoodFood</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <picture>
          <source srcset={mealsWebp} type="image/webp" />
          <source srcset={mealsImage} type="image/png" />
          <img src={mealsImage} alt="A table full of delicious food!" />
        </picture>
      </div>
    </Fragment>
  );

};

export default Header;