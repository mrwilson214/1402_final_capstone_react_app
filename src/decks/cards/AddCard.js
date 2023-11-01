import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import Breadcrumb from "../../Layout/Breadcrumb";
import AddEditCardForm from "./AddEditCardForm";

export const AddCard = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ id: deckId, name: "", description: "" });

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((tempDeck) => {
        setDeck(tempDeck);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
    return () => {
      abortController.abort(); // cancels any pending request or response
    };
  }, []);

  const breadcrumbItems = [
    { path: "/", name: "Home" },
    { path: `/decks/${deckId}`, name: deck.name },
    { path: `#`, name: "Add Card" },
  ];

  const formSubmitHandler = (front, back) => {
    const abortController = new AbortController();
    const card = { front: front, back: back };

    createCard(deckId, card, abortController.signal).catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });

    return () => {
      abortController.abort(); // cancels any pending request or response
    };
  };

  return (
    <>
      <Breadcrumb breadcrumbItems={breadcrumbItems} />
      <h2>{deck.name}: Add Card</h2>
      <AddEditCardForm formSubmitHandler={formSubmitHandler} />
    </>
  );
};

export default AddCard;
