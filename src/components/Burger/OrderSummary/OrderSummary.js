import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // componentDidUpdate() {
  //   console.log("OrderSummary.js   Will Update!");
  // }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (key, i) => {
        return (
          <li key={key + i}>
            <span style={{ textTransform: "capitalize" }}>{key}</span>:
            {this.props.ingredients[key]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>YOUR ORDER</h3>
        <p>Flame Grilled Burger ingredient:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.price.toFixed(2)} </strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE...
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
