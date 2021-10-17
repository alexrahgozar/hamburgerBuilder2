import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
export class Checkout extends Component {

  checkoutCancelledHandler = () => {
    console.log("Checkout.js: PROP: ", this.props);
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (firstState) => {
  return {
    ings: firstState.burgerBuilder.ingredients,
    purchased: firstState.orderR.purchased,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//   };
// };

export default connect(mapStateToProps)(Checkout);
// Route component={ContactData} is replaced with render

// state = {
//   ingredients: null,
//   totalPrice: 0,
// };

// components before we render the child component
// we already have access
// componentWillMount = () => {
//   // console.log("CC.js this.props.location.search", this.props.location.search)
//   // ?bacon=1&cheese=1&lettuce=1&meat=2

//   const query = new URLSearchParams(this.props.location.search);

//   const ingredients = {};
//   let price = 0;
//   // console.log("CC.js query.entries()", query.entries());
//   for (let param of query.entries()) {
//     // console.log("URLSearchParams: pram[0] ", param[0])
//     // key: cheese = val number
//     // ['salad', '1']
//     //  console.log("CC:", ingredients[param[0]] = +param[1])
//     if (param[0] === "price") {
//       price = param[1];
//     } else {
//       ingredients[param[0]] = +param[1];
//     }
//   }
//   console.log("CCXX: ", ingredients);

//   this.setState({ ingredients: ingredients, totalPrice: price });
// };
// price: firstState.burgerBuilder.totalPrice,
