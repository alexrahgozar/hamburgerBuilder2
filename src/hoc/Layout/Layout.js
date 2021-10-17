import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  // should hold a toolbar, sideDrawer, backdrop
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  // new approach for settting setState for toggle
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        {/* <div> Toolbar, sideDrawer, backdrop </div> drawerToggleClicked */}
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}> {this.props.children} </main>
      </Aux>
    );
  }
}

const mapStateToProps = (firstState) => {
  return {
    isAuthenticated: firstState.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
