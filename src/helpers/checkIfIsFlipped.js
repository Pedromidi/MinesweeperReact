
function checkIfIsFlipped(flippedCards, cardId) {
     const cardHasBeenFlipped = flippedCards.filter((fc) => fc.id === cardId).length > 0;
     if (cardHasBeenFlipped) {
          return true;
     }
     return false;
}

export default checkIfIsFlipped;