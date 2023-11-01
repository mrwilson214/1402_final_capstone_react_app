import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

export const AddEditCardForm = ({ card, formSubmitHandler }) => {
  const { deckId } = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (card !== undefined) {
      setFront(card.front);
      setBack(card.back);
    }
  }, [card]);

  return (
    <>
      <form onSubmit={() => formSubmitHandler(front, back)}>
        <div>Front</div>
        <textarea
          id="front"
          type="text"
          placeholder={card ? "" : "Front side of card"}
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="form-control"
        />
        <div>Back</div>
        <textarea
          id="back"
          type="text"
          placeholder={card ? "" : "Back side of card"}
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="form-control"
        />
        <br />
        <button
          style={{ marginRight: 10 }}
          onClick={() => history.push(`/decks/${deckId}`)}
          className="btn-secondary"
        >
          Done
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
};

export default AddEditCardForm;
