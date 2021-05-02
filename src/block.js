import React from "react";
import "./style.css";
import img from "./images";

function block(props){
    if(props.clicked){
      return <div class="clicked" >{props.mine ? <img src={img.mine} width={50} /> : props.count}</div> 
    }
    return <div class="unclicked" row={props.row} col={props.col} onClick={props.handleClick.bind({}, props)}></div>
}

export default block;
