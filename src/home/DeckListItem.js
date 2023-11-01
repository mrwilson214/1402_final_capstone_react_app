import React from "react";
import { useHistory } from "react-router-dom";

export const DeckListItem = ({ deck, deleteClickHandler }) => {
  const cardCount = deck.cards.length;
  const history = useHistory();

  return (
    <table className="table-light table-bordered" id={deck.id} width={600}>
      <tbody className="table-borderless">
        <tr>
          <td className="p-2">
            <h4>{deck.name}</h4>
          </td>
          <td align="right" className="p-2">
            {cardCount !== 1 ? cardCount + " cards" : cardCount + " card"}
          </td>
        </tr>
        <tr>
          <td colSpan={3} className="p-2">
            <div>{deck.description}</div>
          </td>
        </tr>
        <tr>
          <td className="p-2">
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginRight: 25 }}
              onClick={() => history.push(`/decks/${deck.id}`)}
            >
              View
            </button>
            <button
              type="button"
              className="btn btn-info"
              style={{ marginRight: 25 }}
              onClick={() => history.push(`/decks/${deck.id}/study`)}
            >
              Study
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginRight: 25 }}
              onClick={() => deleteClickHandler(deck.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DeckListItem;
