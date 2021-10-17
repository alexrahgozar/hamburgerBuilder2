import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as Actions from "../../store/actions/index";
import axios from "../../axios-orders";

 export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    // loading: false,
    // error: false,
  };

  componentDidMount = () => {
    // console.log("BurgerBuilder.js PROPS: ", this.props);
    this.props.onInitIngredients();
    
  };

  updatePurchaseState = (ingredients) => {
    // console.log("!ingredients: ", ingredients);
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((acc, num) => {
        return acc + num;
      }, 0);

    // this.setState({ purchasable: sum > 0 });
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout")
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients Aren't Able To Load!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            purchased={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (firstState) => {
  return {
    ings: firstState.burgerBuilder.ingredients,
    price: firstState.burgerBuilder.totalPrice,
    error: firstState.burgerBuilder.error,
    isAuthenticated: firstState.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(Actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(Actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(Actions.initIngredients()), 
    onInitPurchase: () =>  dispatch(Actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(Actions.setAuthRedirectPath(path))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
//

// onIngredientAdded: (ingName) => dispatch(Actions.addIngredient(ingName), {ingredientName: ingName}),
// onIngredientRemoved: (ingName) => dispatch(Actions.removeIngredient(ingName), {ingredientName: ingName}),

// addIngredientHandler = (type) => {
//   const oldCount = this.state.ingredients[type];
//   const updatedCount = oldCount + 1;
//   const updatedIgredients = {
//     ...this.state.ingredients,
//   };
//   updatedIgredients[type] = updatedCount;

//   const additionalCost = INGREDIENT_PRICES[type];
//   const oldPrice = this.state.totalPrice;
//   const newPrice = oldPrice + additionalCost;

//   this.setState({ totalPrice: newPrice, ingredients: updatedIgredients });
//   console.log("UP: ", updatedIgredients);
//   this.updatePurchaseHandler(updatedIgredients);
// };

// removeIngredientHandler = (type) => {
//   const oldCount = this.state.ingredients[type];
//   // if(oldCount <= 0) {
//   //   return;
//   // }
//   const updatedCount = oldCount - 1;
//   const updatedIgredients = {
//     ...this.state.ingredients,
//   };
//   updatedIgredients[type] = updatedCount;

//   const deleteCost = INGREDIENT_PRICES[type];
//   const oldPrice = this.state.totalPrice;
//   const newPrice = oldPrice - deleteCost;

//   this.setState({ totalPrice: newPrice, ingredients: updatedIgredients });
//   this.updatePurchaseHandler(updatedIgredients);
// };

// componentDidMount = () => {
//   // console.log("BurgerBuilder.js PROPS: ", this.props);
//   // axios
//   //   .get("https://react-burger-78d0d.firebaseio.com/ingredients.json")
//   //   .then((res) => {
//   //     this.setState({ ingredients: res.data });
//   //   })
//   //   .catch((err) => {
//   //     this.setState({ error: true });
//   //   });
// };

// purchaseContinueHandler = () => {
//   this.props.history.push("/checkout");
//   // alert("Please Continue..");
//   // encodeURIComponent
//   //... used for

//   // const queryParams = [];
//   // for (let i in this.state.ingredients) {
//   //   // console.log("QueryParams BB.js i: ", i)
//   //   // i cheese meat lettuce bacon
//   //   // console.log("QueryParams BB.js val: ", encodeURIComponent(this.state.ingredients[i]))
//   //   // value = 1 amount of ingredients
//   //   queryParams.push(
//   //     encodeURIComponent(i) +
//   //       "=" +
//   //       encodeURIComponent(this.state.ingredients[i])
//   //   );
//   // }

//   // queryParams.push("price=" + this.state.totalPrice);
//   // // console.log("queryParams BB: ", queryParams);
//   // // ["bacon=1", "cheese=1", "lettuce=1", "meat=2"]
//   // const queryString = queryParams.join("&");

//   // this.props.history.push({
//   //   pathname: "/checkout",
//   //   search: "?" + queryString,
//   // });
// };
