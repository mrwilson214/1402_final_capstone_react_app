import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api";

export const StudyCardItem = ({ deckId, cardIndex, setNextCard }) => {
  const [card, setCard] = useState({});
  const [flipped, setFlipped] = useState(false);
  const [deckLength, setDeckLength] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setCard(deck.cards[cardIndex]);
        setFlipped(false);
        setDeckLength(deck.cards.length);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
    return () => {
      abortController.abort();
    };
  }, [cardIndex]);

  return (
    <div className="border rounded p-3">
      <h4>
        Card {cardIndex + 1} of {deckLength}
      </h4>
      <div>{!flipped ? "Question: " + card.front : "Answer: " + card.back}</div>
      <button
        type="button"
        className="btn btn-secondary"
        style={{ marginRight: 10 }}
        onClick={() => setFlipped(!flipped)}
      >
        Flip
      </button>
      {flipped ? (
        <button type="button" className="btn btn-primary" onClick={setNextCard}>
          Next
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StudyCardItem;
