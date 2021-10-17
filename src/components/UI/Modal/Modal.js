import React, { Component } from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Model extends Component {
  // for making sure model unnecessary needs to update!!
  shouldComponentUpdate(nextProps, nextState) {
    // return true
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  // componentDidUpdate() {
  //   console.log("Model.js Will Update!");
  // }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          backdropClicked={this.props.modalClosed}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Model;
