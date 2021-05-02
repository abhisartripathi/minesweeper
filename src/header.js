import React from "react";
import "./style.css";
import img from "./images";

function header({ rows, col, mines, score, handleCol, handleMine, handleRow }) {
  return (
    <div class="flex space-between align-center header">
      <div class="flex-2">
        <div>
          Rows:
          <input
            type="number"
            class="input"
            value={rows}
            onChange={handleRow}
          />
        </div>
        <div>
          Columns:
          <input type="number" class="input" value={col} onChange={handleCol} />
        </div>
        <div>
          Mines:
          <input
            type="number"
            class="input"
            max={rows * col}
            min={1}
            value={mines}
            onChange={handleMine}
          />
        </div>
      </div>
      <div class="flex-1">
        <img src={img.logo} width="50" class="unclicked"/>
      </div>
      <div class="flex-2 score">
        <div>
          Score: <input type="num" class="input" value={score} disabled />
        </div>
      </div>
    </div>
  );
}

export default header;
