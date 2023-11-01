import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import ViewDeckCardItem from "./ViewDeckCardItem";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const ViewDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ id: deckId, name: "" });
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((tempDeck) => {
        setDeck(tempDeck);
        setCards(tempDeck.cards);
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

  const deleteCardHandler = (cardId) => {
    const abortController = new AbortController();

    deleteCard(cardId, abortController.signal)
      .then(setCards(cards.filter((card) => card.id != cardId)))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => {
      abortController.abort();
    };
  };

  const deleteDeckHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId, abortController.signal)
        .then(history.push("/"))
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

  const breadcrumbItems = [
    { path: "/", name: "Home" },
    { path: "#", name: deck.name },
  ];

  const cardList = cards.map((card) => (
    <tr key={card.id}>
      <td>
        <ViewDeckCardItem card={card} deleteCardHandler={deleteCardHandler} />
      </td>
    </tr>
  ));

  return (
    <section className="container">
      <Breadcrumb breadcrumbItems={breadcrumbItems} />
      <table width={600}>
        <tbody>
          <tr>
            <td>
              <h4>{deck.name}</h4>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>{deck.description}</td>
          </tr>
          <tr colSpan={4}>
            <td align="left">
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginRight: 10 }}
                onClick={() => history.push(`/decks/${deck.id}/edit`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
                Edit
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginRight: 10 }}
                onClick={() => history.push(`/decks/${deck.id}/study`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-book"
                  viewBox="0 0 16 16"
                >
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>
                Study
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginRight: 10 }}
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
                Add Cards
              </button>
              <button
                align="right"
                type="button"
                className="btn btn-danger"
                onClick={deleteDeckHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <h3>Cards</h3>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          {cardList.length > 0 ? (
            cardList
          ) : (
            <tr>
              <td>
                <div>This deck has 0 cards.</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ViewDeck;
