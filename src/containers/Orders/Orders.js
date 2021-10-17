import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as Actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
export class Orders extends Component {
  componentDidMount = () => {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  };
  render() {
    // console.log("ORDERS.js: ", this.props.orders);
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (firstState) => {
  return {
    orders: firstState.orderR.orders,
    loading: firstState.orderR.loading,
    token: firstState.auth.token,
    userId: firstState.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(Actions.fetchOrders(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
