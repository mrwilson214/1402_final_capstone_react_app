import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import Breadcrumb from "../../Layout/Breadcrumb";
import AddEditCardForm from "./AddEditCardForm";

export const EditCard = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ id: deckId, name: "", description: "" });
  const [card, setCard] = useState();
  const history = useHistory();

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
      abortController.abort(); // cancels any pending request or response
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then((tempCard) => {
        setCard(tempCard);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
    return () => {
      abortController.abort();
    };
  }, []);

  const breadcrumbItems = [
    { path: "/", name: "Home" },
    { path: `/decks/${deckId}`, name: deck.name },
    { path: `#`, name: `Edit Card ${cardId}` },
  ];

  const formSubmitHandler = (front, back) => {
    const abortController = new AbortController();
    const updatedCard = {
      ...card,
      front: front,
      back: back,
    };

    updateCard(updatedCard, abortController.signal)
      .then(setCard)
      .then(history.push(`/decks/${deckId}`))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => {
      abortController.abort();
    };
  };

  return (
    <>
      <Breadcrumb breadcrumbItems={breadcrumbItems} />
      <h2>{deck.name}: Edit Card</h2>
      <AddEditCardForm card={card} formSubmitHandler={formSubmitHandler} />
    </>
  );
};

export default EditCard;
