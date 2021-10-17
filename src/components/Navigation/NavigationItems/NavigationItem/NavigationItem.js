import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.css";

const NavigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink 
    to={props.link}
    exact={props.exact}
    activeClassName= {classes.active}
    >{props.children}</NavLink>
  </li>
);

export default NavigationItem;

// props.children to display text

// a = anchor tag uses href
// NavLink uses to
/* <NavLink className={props.active ? classes.active : null} to={props.link}></NavLink> */
// no className needed
// and in NavigationItems active is not required to be set