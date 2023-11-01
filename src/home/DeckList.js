import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api";
import { DeckListItem } from "./DeckListItem";

export const DeckList = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then(setDecks)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => abortController.abort();
  }, []);

  const deleteClickHandler = (deckId) => {
    const abortController = new AbortController();
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId, abortController.signal)
        .then(setDecks(decks.filter((tempDeck) => tempDeck.id != deckId)))
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        });
    }
    return () => {
      abortController.abort();
    };
  };

  const deckList =
    decks.length > 0 ? (
      decks.map((deck) => (
        <tr key={deck.id}>
          <td>
            <DeckListItem deck={deck} deleteClickHandler={deleteClickHandler} />
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td></td>
      </tr>
    );

  return (
    <section className="container">
      <table className="table-light table-bordered">
        <tbody>{deckList}</tbody>
      </table>
    </section>
  );
};

export default DeckList;
