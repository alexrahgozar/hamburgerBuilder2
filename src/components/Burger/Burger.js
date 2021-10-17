import React from "react";
import { withRouter } from "react-router-dom";
// withRouter used to pass match history to child components

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

// let x = 0
// let y = x
const burger = (props) => {
  // console.log("Burger.js props: ", props)
  //find the keys
  // map through key
  let convertIngredientsInfoObj = Object.keys(props.ingredients)
    .map((ingredStrKeys) => {
      // add objs values into array

      // x+=1
      // console.log("x: ", x)

      return (
        [...Array(props.ingredients[ingredStrKeys])]
          // map throw arr + i
          // indexes determine the amount of ingredents

          .map((a, i) => {
            // console.log("x: ", y)
            i++;
            return (
              <BurgerIngredient key={ingredStrKeys + i} type={ingredStrKeys} />
            );
          })
      );
    })
    // reduce accepts an callback, and intial array
    // prevValue/currValue, and initial array
    // arr = acc
    // el = curr
    // flat the array
    .reduce((arr, el) => {
      // console.log(arr.concat(el));
      return arr.concat(el);
    }, []);

  if (convertIngredientsInfoObj.length === 0) {
    convertIngredientsInfoObj = <p>Please start adding ingredients</p>;
  }

  // console.log("H1: ", convertIngredientsInfoObj);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {convertIngredientsInfoObj}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
// export default burger;