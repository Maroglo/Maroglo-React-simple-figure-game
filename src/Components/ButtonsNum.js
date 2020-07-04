import React from "react";

//color theme
const colors = {
    available: "lightblue",
    used: "green",
    wrong: "red",
    candidate: "yellow",
  };
const ButtonsNum = (props) => (
    <button className="btn btn-danger number"
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => props.onClick(props.number, props.status)}>
      {props.number}
    </button>
  )

  export default ButtonsNum;