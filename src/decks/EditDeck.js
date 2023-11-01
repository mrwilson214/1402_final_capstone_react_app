import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import CreateEditDeckForm from "./CreateEditDeckForm";

export const EditDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ id: deckId, name: "", description: "" });

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

  const breadcrumbItems = [
    { path: "/", name: "Home" },
    { path: `/decks/${deckId}`, name: deck.name },
    { path: `#`, name: "Edit Deck" },
  ];

  const formSubmitHandler = (name, description) => {
    const abortController = new AbortController();
    const updatedDeck = {
      ...deck,
      name: name,
      description: description,
    };

    updateDeck(updatedDeck, abortController.signal)
      .then(setDeck)
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
      <h2>Edit Deck</h2>
      <CreateEditDeckForm deck={deck} formSubmitHandler={formSubmitHandler} />
    </>
  );
};

export default EditDeck;
