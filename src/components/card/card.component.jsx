import React, { useState } from "react";
import "./card.css";
import { PLACEHOLDER_CARDBACK_PATH } from "../../constants";
import { PLACEHOLDER_CARD_PATH } from "../../constants";

function Card({ name }) {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div 
      className={`card${flipped ? " flipped" : ""}`} 
      data-logo={name} 
      onClick={handleCardClick}
    >
      <img
        src={PLACEHOLDER_CARDBACK_PATH}
        className="card-back"
        alt="card placeholder"
      />
      <img
        src={`${PLACEHOLDER_CARD_PATH}${name}.png`}
        className="card-front"
        alt="card"
      />
    </div>
  );
}

export default Card;