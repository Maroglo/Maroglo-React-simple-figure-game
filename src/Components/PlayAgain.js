import React from "react";

const PlayAgain = props => (
    <div>
      <div className="message"
        style={{ color: props.gameStatus === "lost" ? "red" : "green" }}>
        {props.gameStatus === "lost" ? "Game over" : "You win"}
      </div>
      <button className="btn btn-success game-done"
        onClick={() => props.onClick()}
      >Play again</button>
    </div>
  )

  export default PlayAgain;