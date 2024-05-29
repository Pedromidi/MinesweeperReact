import React from "react";
import "./card.css";
import { PLACEHOLDER_CARDBACK_PATH, PLACEHOLDER_CARD_PATH, FLAG_PATH, QM_PATH } from "../../constants";

function Card({ id, name, state, onCardClick, onRightClick }) {
  const flippedClass = state === "flipped" ? " flipped" : "";
  const stateClass = state === "flag" ? " flipped flag" : state === "qm" ? " flipped qm" : "";

  const handleClick = () => {
    if (state === "placeholder") {
      onCardClick(id);
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    onRightClick(id);
  };

  const getImageSrc = () => {
    if (state === "flag") return FLAG_PATH;
    if (state === "qm") return QM_PATH;
    if (state === "flipped") return `${PLACEHOLDER_CARD_PATH}${name}.png`;
    return PLACEHOLDER_CARDBACK_PATH;
  };

  return (
    <div
      className={`card ${flippedClass} ${stateClass}`}
      data-logo={name}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      <img
        src={getImageSrc()}
        className="card-front"
        alt="card"
      />
    </div>
  );
}

export default Card;