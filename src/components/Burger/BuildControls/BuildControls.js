import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Lettuce", type: "lettuce" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((item) => (
      <BuildControl
        key={item.label}
        label={item.label}
        add={() => props.ingredientAdded(item.type)}
        remove={() => {
          props.ingredientRemove(item.type);
        }}
        disabled={props.disabled[item.type]}
      />
    ))}

    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchased}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
);

export default BuildControls;
