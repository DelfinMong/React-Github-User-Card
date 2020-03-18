import React from "react";

const Usercard = props => {
  return (
    <div>
      <h1>card</h1>
      <p>{props.login}</p>
      <img src={props.img} alt="avatar" />
    </div>
  );
};

export default Usercard;