import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import CreateEditDeckForm from "./CreateEditDeckForm";

export const CreateDeck = () => {
  const history = useHistory();

  const breadcrumbItems = [
    { path: "/", name: "Home" },
    { path: "#", name: "Create Deck" },
  ];

  const formSubmitHandler = (name, description) => {
    const abortController = new AbortController();
    const deck = { name: name, description: description };

    createDeck(deck, abortController.signal)
      .then((deck) => {
        history.push("/decks/" + deck.id);
      })
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
      <h2>Create Deck</h2>
      <CreateEditDeckForm formSubmitHandler={formSubmitHandler} />
    </>
  );
};

export default CreateDeck;
