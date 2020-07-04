import React from "react";
import utils from "../math";

const DisplayStars = props => (
    <>
      {utils.range(1, props.countStar).map(starId =>
        <div key={starId} className="star" />
      )}
    </>
  )
export default DisplayStars;  