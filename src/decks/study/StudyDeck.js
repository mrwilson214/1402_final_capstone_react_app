import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../../Layout/Breadcrumb";
import StudyCardItem from "./StudyCardItem";

export const StudyDeck = () => {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });
  const [currCardIndex, setCurrCardIndex] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
    return () => {
      abortController.abort();
    };
  }, []);

  const setNextCard = () => {
    if (currCardIndex + 1 >= deck.cards.length) {
      if (
        window.confirm(
          "Restart cards?\n\nClick 'cancel' to return to the home page."
        )
      ) {
        setCurrCardIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setCurrCardIndex(currCardIndex + 1);
    }
  };

  const breadcrumbItems = [
    { path: "/", name: "Home" },
    { path: "/decks/" + deck.id, name: deck.name },
    { path: "#", name: "Study" },
  ];

  return (
    <>
      <Breadcrumb breadcrumbItems={breadcrumbItems} />
      <h3>{deck.name}: Study</h3>
      {deck.cards.length >= 3 ? (
        <StudyCardItem
          deckId={deckId}
          cardIndex={currCardIndex}
          setNextCard={setNextCard}
        />
      ) : (
        <>
          <h4>Not enough cards.</h4>
          <div>
            You need at least 3 cards to study. There are {deck.cards.length}{" "}
            cards in this deck.
          </div>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Add Card
          </button>
        </>
      )}
    </>
  );
};

export default StudyDeck;
